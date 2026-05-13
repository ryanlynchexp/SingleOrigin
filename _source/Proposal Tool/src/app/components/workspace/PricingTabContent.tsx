import { useState } from "react";
import { Plus, Trash2, TrendingUp, DollarSign, Edit2, Save } from "lucide-react";
import { acmeProposalData } from "../../data/acmeProposalData";

interface ExpenseItem {
  id: string;
  category: string;
  description: string;
  cost: string;
}

export function PricingTabContent({ teamCost = 0 }: { teamCost?: number }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    ...acmeProposalData.pricing,
    desiredMargin: 20, // 20% default margin
  });

  const [hardwareItems, setHardwareItems] = useState<ExpenseItem[]>([
    { id: "hw-1", category: "Cloud Infrastructure", description: "AWS compute, storage, and networking", cost: "45000" },
    { id: "hw-2", category: "Monitoring & Security", description: "DataDog, CloudWatch, security tools", cost: "12000" },
  ]);

  const handleSave = () => {
    setIsEditing(false);
    // Save logic here
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData({ ...acmeProposalData.pricing, desiredMargin: 20 });
  };

  const handleExpenseChange = (index: number, field: keyof ExpenseItem, value: string) => {
    if (!isEditing) return;
    const newExpenses = [...formData.additionalExpenses];
    newExpenses[index] = {
      ...newExpenses[index],
      [field]: value,
    };
    setFormData({ ...formData, additionalExpenses: newExpenses });
  };

  const handleHardwareChange = (index: number, field: keyof ExpenseItem, value: string) => {
    if (!isEditing) return;
    const newHardware = [...hardwareItems];
    newHardware[index] = {
      ...newHardware[index],
      [field]: value,
    };
    setHardwareItems(newHardware);
  };

  const handleAddExpense = () => {
    const newExpense: ExpenseItem = {
      id: `exp-${Date.now()}`,
      category: "Other",
      description: "New expense",
      cost: "0",
    };
    setFormData({
      ...formData,
      additionalExpenses: [...formData.additionalExpenses, newExpense],
    });
  };

  const handleAddHardware = () => {
    const newHardware: ExpenseItem = {
      id: `hw-${Date.now()}`,
      category: "Hardware",
      description: "New hardware/infrastructure",
      cost: "0",
    };
    setHardwareItems([...hardwareItems, newHardware]);
  };

  const handleRemoveExpense = (index: number) => {
    setFormData({
      ...formData,
      additionalExpenses: formData.additionalExpenses.filter((_, i) => i !== index),
    });
  };

  const handleRemoveHardware = (index: number) => {
    setHardwareItems(hardwareItems.filter((_, i) => i !== index));
  };

  // Calculate totals
  const hardwareCost = hardwareItems.reduce((sum, item) => sum + parseFloat(item.cost || "0"), 0);
  const otherCosts = formData.additionalExpenses.reduce(
    (sum, item) => sum + parseFloat(item.cost || "0"),
    0
  );

  // Use provided teamCost or fallback to a default for demo
  const effectiveTeamCost = teamCost || 850000;

  const subtotal = effectiveTeamCost + hardwareCost + otherCosts;
  const marginAmount = subtotal * (formData.desiredMargin / 100);
  const totalProposalValue = subtotal + marginAmount;

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="glass-strong rounded-xl p-6 border border-white/10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg text-foreground font-medium">Pricing Configuration</h2>
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="inline-flex items-center gap-2 px-4 py-2 glass-subtle border border-white/10 hover:bg-white/10 text-foreground rounded-lg text-sm transition-all"
            >
              <Edit2 className="w-4 h-4" strokeWidth={1.5} />
              Edit
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={handleSave}
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm hover:bg-primary/90 transition-all glow-primary font-medium"
              >
                <Save className="w-4 h-4" strokeWidth={1.5} />
                Save Changes
              </button>
              <button
                onClick={handleCancel}
                className="px-4 py-2 glass-subtle border border-white/10 text-foreground rounded-lg text-sm hover:bg-white/10 transition-all"
              >
                Cancel
              </button>
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm text-muted-foreground mb-2 font-medium">Owner</label>
          <input
            type="text"
            value={formData.owner}
            onChange={(e) => setFormData({ ...formData, owner: e.target.value })}
            placeholder="Assign team member"
            disabled={!isEditing}
            className="w-48 px-4 py-2 glass-inset border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 text-foreground transition-all text-sm disabled:opacity-60 disabled:cursor-not-allowed"
          />
        </div>

        {/* Pricing Formula Overview */}
        <div className="mt-6 mb-8 p-6 rounded-xl glass-subtle border border-primary/20">
          <div className="flex items-center gap-2 mb-4">
            <DollarSign className="w-5 h-5 text-primary" strokeWidth={1.5} />
            <h3 className="text-base font-medium text-foreground">Pricing Formula</h3>
          </div>
          <div className="text-sm text-muted-foreground space-y-2">
            <div className="font-mono">
              <span className="text-foreground">Total Proposal Value</span> = (Team Cost + Hardware + Other Costs) × (1 + Margin %)
            </div>
            <div className="text-xs opacity-75">
              All costs are summed, then the desired margin percentage is applied to calculate the final proposal value
            </div>
          </div>
        </div>

        {/* Cost Breakdown */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          {/* Team Cost (from Team tab) */}
          <div className="glass-inset rounded-xl p-5 border border-white/10">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-sm font-medium text-muted-foreground">Team Cost</h3>
            </div>
            <p className="text-2xl font-medium text-foreground">
              ${effectiveTeamCost.toLocaleString()}
            </p>
            <p className="text-xs text-muted-foreground mt-2">From Team tab calculations</p>
          </div>

          {/* Hardware */}
          <div className="glass-inset rounded-xl p-5 border border-white/10">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center">
                <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                </svg>
              </div>
              <h3 className="text-sm font-medium text-muted-foreground">Hardware</h3>
            </div>
            <p className="text-2xl font-medium text-foreground">
              ${hardwareCost.toLocaleString()}
            </p>
            <p className="text-xs text-muted-foreground mt-2">Infrastructure costs</p>
          </div>

          {/* Other Costs */}
          <div className="glass-inset rounded-xl p-5 border border-white/10">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-success/10 border border-success/20 flex items-center justify-center">
                <svg className="w-4 h-4 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-sm font-medium text-muted-foreground">Other Costs</h3>
            </div>
            <p className="text-2xl font-medium text-foreground">
              ${otherCosts.toLocaleString()}
            </p>
            <p className="text-xs text-muted-foreground mt-2">Tools, travel, training, etc.</p>
          </div>
        </div>

        {/* Hardware Items */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-medium text-foreground">Hardware & Infrastructure</h3>
            <button
              onClick={handleAddHardware}
              className="inline-flex items-center gap-2 px-3 py-1.5 glass-subtle border border-white/10 hover:bg-white/10 text-foreground rounded-lg text-sm transition-all"
            >
              <Plus className="w-4 h-4" strokeWidth={1.5} />
              Add Item
            </button>
          </div>
          <div className="space-y-3">
            {hardwareItems.map((item, index) => (
              <div key={item.id} className="glass-subtle rounded-lg p-4 border border-white/10">
                <div className="grid grid-cols-12 gap-4 items-start">
                  <div className="col-span-3">
                    <label className="block text-xs text-muted-foreground mb-1.5">Category</label>
                    <input
                      type="text"
                      value={item.category}
                      onChange={(e) => handleHardwareChange(index, "category", e.target.value)}
                      className="w-full px-3 py-2 glass-inset border border-white/10 rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                  <div className="col-span-6">
                    <label className="block text-xs text-muted-foreground mb-1.5">Description</label>
                    <input
                      type="text"
                      value={item.description}
                      onChange={(e) => handleHardwareChange(index, "description", e.target.value)}
                      className="w-full px-3 py-2 glass-inset border border-white/10 rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-xs text-muted-foreground mb-1.5">Cost</label>
                    <div className="flex items-center gap-1">
                      <span className="text-sm text-muted-foreground">$</span>
                      <input
                        type="number"
                        value={item.cost}
                        onChange={(e) => handleHardwareChange(index, "cost", e.target.value)}
                        className="w-full px-3 py-2 glass-inset border border-white/10 rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                      />
                    </div>
                  </div>
                  <div className="col-span-1 flex items-end justify-end">
                    <button
                      onClick={() => handleRemoveHardware(index)}
                      className="p-2 glass-subtle border border-white/10 hover:bg-destructive/10 hover:border-destructive/30 rounded-lg transition-all"
                    >
                      <Trash2 className="w-4 h-4 text-destructive" strokeWidth={1.5} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Other Costs */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-medium text-foreground">Other Costs</h3>
            <button
              onClick={handleAddExpense}
              className="inline-flex items-center gap-2 px-3 py-1.5 glass-subtle border border-white/10 hover:bg-white/10 text-foreground rounded-lg text-sm transition-all"
            >
              <Plus className="w-4 h-4" strokeWidth={1.5} />
              Add Item
            </button>
          </div>
          <div className="space-y-3">
            {formData.additionalExpenses.map((item, index) => (
              <div key={item.id} className="glass-subtle rounded-lg p-4 border border-white/10">
                <div className="grid grid-cols-12 gap-4 items-start">
                  <div className="col-span-3">
                    <label className="block text-xs text-muted-foreground mb-1.5">Category</label>
                    <select
                      value={item.category}
                      onChange={(e) => handleExpenseChange(index, "category", e.target.value)}
                      className="w-full px-3 py-2 glass-inset border border-white/10 rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    >
                      <option value="Tools & Software">Tools & Software</option>
                      <option value="Travel">Travel</option>
                      <option value="Insurance">Insurance</option>
                      <option value="Training">Training</option>
                      <option value="Legal">Legal</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="col-span-6">
                    <label className="block text-xs text-muted-foreground mb-1.5">Description</label>
                    <input
                      type="text"
                      value={item.description}
                      onChange={(e) => handleExpenseChange(index, "description", e.target.value)}
                      className="w-full px-3 py-2 glass-inset border border-white/10 rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-xs text-muted-foreground mb-1.5">Cost</label>
                    <div className="flex items-center gap-1">
                      <span className="text-sm text-muted-foreground">$</span>
                      <input
                        type="number"
                        value={item.cost}
                        onChange={(e) => handleExpenseChange(index, "cost", e.target.value)}
                        className="w-full px-3 py-2 glass-inset border border-white/10 rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                      />
                    </div>
                  </div>
                  <div className="col-span-1 flex items-end justify-end">
                    <button
                      onClick={() => handleRemoveExpense(index)}
                      className="p-2 glass-subtle border border-white/10 hover:bg-destructive/10 hover:border-destructive/30 rounded-lg transition-all"
                    >
                      <Trash2 className="w-4 h-4 text-destructive" strokeWidth={1.5} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Margin Configuration */}
        <div className="mb-8 p-6 rounded-xl glass-inset border border-white/10">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5 text-success" strokeWidth={1.5} />
                <h3 className="text-base font-medium text-foreground">Desired Margin</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Markup percentage applied to subtotal
              </p>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="number"
                min="0"
                max="100"
                step="0.5"
                value={formData.desiredMargin}
                onChange={(e) =>
                  setFormData({ ...formData, desiredMargin: parseFloat(e.target.value) || 0 })
                }
                className="w-24 px-4 py-3 glass-inset border border-white/10 rounded-lg text-lg text-foreground text-right focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <span className="text-lg text-foreground font-medium">%</span>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Margin Amount</span>
            <span className="text-lg font-medium text-success">
              +${marginAmount.toLocaleString(undefined, { maximumFractionDigits: 0 })}
            </span>
          </div>
        </div>

        {/* Final Totals */}
        <div className="border-t border-white/10 pt-6 space-y-3">
          <div className="flex items-center justify-between text-base">
            <span className="text-muted-foreground">Subtotal (Team + Hardware + Other)</span>
            <span className="font-medium text-foreground">
              ${subtotal.toLocaleString(undefined, { maximumFractionDigits: 0 })}
            </span>
          </div>
          <div className="flex items-center justify-between text-base">
            <span className="text-muted-foreground">Margin ({formData.desiredMargin}%)</span>
            <span className="font-medium text-success">
              +${marginAmount.toLocaleString(undefined, { maximumFractionDigits: 0 })}
            </span>
          </div>
          <div className="flex items-center justify-between text-2xl pt-3 border-t border-white/10">
            <span className="font-medium text-foreground">Total Proposal Value</span>
            <span className="font-medium text-foreground">
              ${totalProposalValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}