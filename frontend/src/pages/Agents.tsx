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
    <div className="flex flex-col h-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <div className="border-b border-slate-700/50 bg-slate-900/50 backdrop-blur-xl">
        <div className="px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-slate-100 tracking-tight">Agents</h1>
              <p className="text-sm text-slate-400 mt-1">
                Configure specialized AI agents with custom parameters
              </p>
            </div>
            {!isCreating && (
              <button
                onClick={() => setIsCreating(true)}
                className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-all shadow-lg shadow-blue-600/20 hover:shadow-blue-500/30 font-medium flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                New Agent
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-8 py-6">
        {/* Create/Edit Form */}
        {isCreating && (
          <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 mb-6">
            <h2 className="text-lg font-semibold text-slate-100 mb-4">
              {editingId ? "Edit Agent" : "Create New Agent"}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">
                      Agent Name *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      required
                      className="w-full px-4 py-2.5 bg-slate-900/50 border border-slate-700/50 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all"
                      placeholder="e.g., Code Assistant, Writer"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">
                      Base Model *
                    </label>
                    <input
                      type="text"
                      value={formData.base_model}
                      onChange={(e) =>
                        setFormData({ ...formData, base_model: e.target.value })
                      }
                      required
                      className="w-full px-4 py-2.5 bg-slate-900/50 border border-slate-700/50 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all"
                      placeholder="e.g., llama2, mistral, codellama"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    rows={2}
                    className="w-full px-4 py-2.5 bg-slate-900/50 border border-slate-700/50 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all resize-none"
                    placeholder="What this agent specializes in..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">
                    System Prompt
                  </label>
                  <textarea
                    value={formData.system_prompt}
                    onChange={(e) =>
                      setFormData({ ...formData, system_prompt: e.target.value })
                    }
                    rows={4}
                    className="w-full px-4 py-2.5 bg-slate-900/50 border border-slate-700/50 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all resize-none"
                    placeholder="You are a helpful assistant that..."
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">
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
                      className="w-full accent-blue-500"
                    />
                    <div className="flex justify-between text-xs text-slate-500 mt-1">
                      <span>Precise</span>
                      <span>Creative</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">
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
                      className="w-full px-4 py-2.5 bg-slate-900/50 border border-slate-700/50 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all"
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-2 mt-6">
                <button
                  type="submit"
                  disabled={createMutation.isPending || updateMutation.isPending}
                  className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-all shadow-lg shadow-blue-600/20 hover:shadow-blue-500/30 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
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
                  className="px-4 py-2.5 bg-slate-700/50 hover:bg-slate-700 text-slate-300 rounded-lg transition-all font-medium"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Agents List */}
        {isLoading ? (
          <div className="text-center py-12 text-slate-500">Loading...</div>
        ) : !agents || agents.length === 0 ? (
          <div className="text-center py-12 text-slate-500">
            No agents yet. Create your first agent to get started!
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {agents.map((agent) => (
              <div
                key={agent.id}
                className="bg-slate-800/30 backdrop-blur-sm hover:bg-slate-800/50 border border-slate-700/50 hover:border-slate-600/50 rounded-xl p-5 transition-all duration-200 hover:shadow-xl hover:shadow-black/20"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-semibold text-slate-100">
                    {agent.name}
                  </h3>
                  <span className="px-2 py-1 text-xs bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-md font-medium">
                    {agent.base_model}
                  </span>
                </div>
                {agent.description && (
                  <p className="text-sm text-slate-400 mb-3">
                    {agent.description}
                  </p>
                )}
                <div className="space-y-1 text-xs text-slate-500 mb-4">
                  <div className="flex justify-between">
                    <span>Temperature:</span>
                    <span className="font-medium text-slate-400">{agent.temperature}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Max Tokens:</span>
                    <span className="font-medium text-slate-400">{agent.max_tokens}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(agent)}
                    className="flex-1 px-3 py-1.5 text-sm bg-slate-700/50 hover:bg-slate-700 text-slate-300 rounded-lg transition-all font-medium"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      if (confirm(`Delete agent "${agent.name}"?`)) {
                        deleteMutation.mutate(agent.id);
                      }
                    }}
                    className="flex-1 px-3 py-1.5 text-sm bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 rounded-lg transition-all font-medium"
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
