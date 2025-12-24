import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { agentsApi } from "../services/api";
import type { Agent } from "../types";

export const Agents: React.FC = () => {
  const queryClient = useQueryClient();
  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    base_model: "llama2",
    system_prompt: "",
    temperature: 0.7,
    max_tokens: 2048,
  });

  // Fetch agents
  const { data: agents, isLoading } = useQuery({
    queryKey: ["agents"],
    queryFn: async () => {
      const response = await agentsApi.list();
      return response.data;
    },
  });

  // Create mutation
  const createMutation = useMutation({
    mutationFn: (data: Partial<Agent>) => agentsApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["agents"] });
      setIsCreating(false);
      resetForm();
    },
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Agent> }) =>
      agentsApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["agents"] });
      setEditingId(null);
      resetForm();
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: (id: number) => agentsApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["agents"] });
    },
  });

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      base_model: "llama2",
      system_prompt: "",
      temperature: 0.7,
      max_tokens: 2048,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      updateMutation.mutate({ id: editingId, data: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  const handleEdit = (agent: Agent) => {
    setEditingId(agent.id);
    setFormData({
      name: agent.name,
      description: agent.description || "",
      base_model: agent.base_model,
      system_prompt: agent.system_prompt || "",
      temperature: agent.temperature,
      max_tokens: agent.max_tokens,
    });
    setIsCreating(true);
  };

  const handleCancel = () => {
    setIsCreating(false);
    setEditingId(null);
    resetForm();
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Agents</h1>
            <p className="text-sm text-gray-500 mt-1">
              Configure specialized AI agents with custom parameters
            </p>
          </div>
          {!isCreating && (
            <button
              onClick={() => setIsCreating(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              + New Agent
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
              {editingId ? "Edit Agent" : "Create New Agent"}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Agent Name *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., Code Assistant, Writer"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Base Model *
                    </label>
                    <input
                      type="text"
                      value={formData.base_model}
                      onChange={(e) =>
                        setFormData({ ...formData, base_model: e.target.value })
                      }
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., llama2, mistral, codellama"
                    />
                  </div>
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
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="What this agent specializes in..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    System Prompt
                  </label>
                  <textarea
                    value={formData.system_prompt}
                    onChange={(e) =>
                      setFormData({ ...formData, system_prompt: e.target.value })
                    }
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="You are a helpful assistant that..."
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Temperature: {formData.temperature}
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="2"
                      step="0.1"
                      value={formData.temperature}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          temperature: parseFloat(e.target.value),
                        })
                      }
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>Precise</span>
                      <span>Creative</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Max Tokens
                    </label>
                    <input
                      type="number"
                      value={formData.max_tokens}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          max_tokens: parseInt(e.target.value),
                        })
                      }
                      min="128"
                      max="32000"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-2 mt-6">
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

        {/* Agents List */}
        {isLoading ? (
          <div className="text-center py-12 text-gray-500">Loading...</div>
        ) : !agents || agents.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            No agents yet. Create your first agent to get started!
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {agents.map((agent) => (
              <div
                key={agent.id}
                className="bg-white rounded-lg shadow-md p-5 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {agent.name}
                  </h3>
                  <span className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded">
                    {agent.base_model}
                  </span>
                </div>
                {agent.description && (
                  <p className="text-sm text-gray-600 mb-3">
                    {agent.description}
                  </p>
                )}
                <div className="space-y-1 text-xs text-gray-500 mb-4">
                  <div className="flex justify-between">
                    <span>Temperature:</span>
                    <span className="font-medium">{agent.temperature}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Max Tokens:</span>
                    <span className="font-medium">{agent.max_tokens}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(agent)}
                    className="flex-1 px-3 py-1.5 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      if (confirm(`Delete agent "${agent.name}"?`)) {
                        deleteMutation.mutate(agent.id);
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
