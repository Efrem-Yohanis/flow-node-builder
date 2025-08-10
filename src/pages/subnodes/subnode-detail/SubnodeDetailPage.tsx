import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSubnode, subnodeService, SubnodeVersion } from "@/services/subnodeService";
import { toast } from "sonner";
import { SubnodeHeader } from "./components/SubnodeHeader";
import { SubnodeInfo } from "./components/SubnodeInfo";
import { ParameterValuesTable } from "./components/ParameterValuesTable";
import { VersionHistoryModal } from "./components/VersionHistoryModal";
import { CreateVersionModal } from "./components/CreateVersionModal";

export function SubnodeDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedVersion, setSelectedVersion] = useState<SubnodeVersion | null>(null);
  const [showVersionHistoryModal, setShowVersionHistoryModal] = useState(false);
  const [showCreateVersionModal, setShowCreateVersionModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const { data: subnode, loading, error, refetch } = useSubnode(id || '');

  // Set initial version when subnode data loads
  useEffect(() => {
    if (subnode && subnode.versions.length > 0) {
      // Find the active version first
      const activeVersion = subnode.versions.find(v => v.is_deployed);
      if (activeVersion) {
        setSelectedVersion(activeVersion);
      } else {
        // If no active version, select the latest version by number
        const sortedVersions = [...subnode.versions].sort((a, b) => b.version - a.version);
        setSelectedVersion(sortedVersions[0]);
      }
    }
  }, [subnode]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading subnode...</p>
        </div>
      </div>
    );
  }

  if (error || !subnode) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <p className="text-destructive mb-4">Error loading subnode: {error}</p>
          <button onClick={() => refetch()} className="btn">Try Again</button>
        </div>
      </div>
    );
  }

  const handleEditVersion = () => {
    if (selectedVersion) {
      navigate(`/subnodes/${id}/edit?version=${selectedVersion.version}`);
    }
  };

  const handleDeployVersion = async () => {
    if (!selectedVersion) return;
    
    setIsLoading(true);
    try {
      await subnodeService.activateVersion(id!, selectedVersion.version);
      toast.success(`Version ${selectedVersion.version} deployed successfully`);
      await refetch();
      // Update selected version to reflect deployment status
      if (subnode) {
        const updatedVersion = subnode.versions.find(v => v.version === selectedVersion.version);
        if (updatedVersion) {
          setSelectedVersion({ ...updatedVersion, is_deployed: true });
        }
      }
    } catch (error) {
      toast.error("Failed to deploy version");
      console.error("Deploy error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUndeployVersion = async () => {
    if (!selectedVersion) return;
    
    setIsLoading(true);
    try {
      await subnodeService.undeployVersion(id!, selectedVersion.version);
      toast.success(`Version ${selectedVersion.version} undeployed successfully`);
      await refetch();
      // Update selected version to reflect undeployment status
      setSelectedVersion({ ...selectedVersion, is_deployed: false });
    } catch (error) {
      toast.error("Failed to undeploy version");
      console.error("Undeploy error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateNewVersion = async (comment: string) => {
    setIsLoading(true);
    try {
      const newVersion = await subnodeService.createEditableVersion(id!, { version_comment: comment });
      toast.success(`New version ${newVersion.version} created successfully`);
      setShowCreateVersionModal(false);
      navigate(`/subnodes/${id}/edit?version=${newVersion.version}`);
    } catch (error) {
      toast.error("Failed to create new version");
      console.error("Create version error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectVersion = (version: SubnodeVersion) => {
    setSelectedVersion(version);
    setShowVersionHistoryModal(false);
  };

  const handleActivateVersionFromModal = async (version: SubnodeVersion) => {
    setIsLoading(true);
    try {
      await subnodeService.activateVersion(id!, version.version);
      toast.success(`Version ${version.version} activated successfully`);
      await refetch();
      // Update selected version and close modal
      setSelectedVersion({ ...version, is_deployed: true });
      setShowVersionHistoryModal(false);
    } catch (error) {
      toast.error("Failed to activate version");
      console.error("Activate error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <SubnodeHeader
        subnode={subnode}
        selectedVersion={selectedVersion}
        onEditVersion={handleEditVersion}
        onDeployVersion={handleDeployVersion}
        onUndeployVersion={handleUndeployVersion}
        onCreateNewVersion={() => setShowCreateVersionModal(true)}
        onShowVersionHistory={() => setShowVersionHistoryModal(true)}
        isLoading={isLoading}
      />

      {/* Subnode Basic Information */}
      <SubnodeInfo 
        subnode={subnode} 
        selectedVersion={selectedVersion} 
      />

      {/* Parameter Values Table */}
      <ParameterValuesTable 
        selectedVersion={selectedVersion} 
      />

      {/* Version History Modal */}
      <VersionHistoryModal
        open={showVersionHistoryModal}
        onOpenChange={setShowVersionHistoryModal}
        versions={subnode.versions}
        selectedVersion={selectedVersion}
        onSelectVersion={handleSelectVersion}
        onActivateVersion={handleActivateVersionFromModal}
        isLoading={isLoading}
      />

      {/* Create Version Modal */}
      <CreateVersionModal
        open={showCreateVersionModal}
        onOpenChange={setShowCreateVersionModal}
        onCreateVersion={handleCreateNewVersion}
        isLoading={isLoading}
      />
    </div>
  );
}