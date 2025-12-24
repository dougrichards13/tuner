import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { projectsApi } from "../services/api";
import type { Project } from "../types";

export const Projects: React.FC = () => {
  const queryClient = useQueryClient();
  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({ name: "", description: "" });

  // Fetch projects
  const { data: projects, isLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const response = await projectsApi.list();
      return response.data;
    },
  });

  // Create mutation
  const createMutation = useMutation({
    mutationFn: (data: Partial<Project>) => projectsApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      setIsCreating(false);
      setFormData({ name: "", description: "" });
    },
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Project> }) =>
      projectsApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      setEditingId(null);
      setFormData({ name: "", description: "" });
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: (id: number) => projectsApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      updateMutation.mutate({ id: editingId, data: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  const handleEdit = (project: Project) => {
    setEditingId(project.id);
    setFormData({ name: project.name, description: project.description || "" });
    setIsCreating(true);
  };

  const handleCancel = () => {
    setIsCreating(false);
    setEditingId(null);
    setFormData({ name: "", description: "" });
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Projects</h1>
            <p className="text-sm text-gray-500 mt-1">
              Manage your AI project workspaces
            </p>
          </div>
          {!isCreating && (
            <button
              onClick={() => setIsCreating(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              + New Project
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {/* Create/Edit Form */}
        {isCreating && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-lg font-semibold mb-4">
              {editingId ? "Edit Project" : "Create New Project"}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Project Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Customer Support, Code Review"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Brief description of this project..."
                  />
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <button
                  type="submit"
                  disabled={createMutation.isPending || updateMutation.isPending}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 transition-colors"
                >
                  {createMutation.isPending || updateMutation.isPending
                    ? "Saving..."
                    : editingId
                    ? "Update"
                    : "Create"}
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Projects List */}
        {isLoading ? (
          <div className="text-center py-12 text-gray-500">Loading...</div>
        ) : !projects || projects.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            No projects yet. Create your first project to get started!
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map((project) => (
              <div
                key={project.id}
                className="bg-white rounded-lg shadow-md p-5 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {project.name}
                  </h3>
                  <span className="text-xs text-gray-400">
                    #{project.id}
                  </span>
                </div>
                {project.description && (
                  <p className="text-sm text-gray-600 mb-4">
                    {project.description}
                  </p>
                )}
                <div className="text-xs text-gray-500 mb-4">
                  Created: {new Date(project.created_at).toLocaleDateString()}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(project)}
                    className="flex-1 px-3 py-1.5 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      if (
                        confirm(
                          `Delete project "${project.name}"? This will also delete all conversations.`
                        )
                      ) {
                        deleteMutation.mutate(project.id);
                      }
                    }}
                    className="flex-1 px-3 py-1.5 text-sm bg-red-50 text-red-600 rounded hover:bg-red-100 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
