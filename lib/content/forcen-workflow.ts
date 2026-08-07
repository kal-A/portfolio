// ForceN Dev System workflow: node/edge data for the interactive diagram.
// Content source: PORTFOLIO_CASE_STUDY_SYSTEM.md section 24.12.4-24.12.5.
// Reconstructed and public-safe. Node positions are NOT stored here --
// they are computed at render time by elkjs so the layout can never
// drift out of sync with the edges (see ForceNWorkflowDiagram.tsx).

export type WorkflowNodeType =
  | "event"
  | "process"
  | "decision"
  | "data-store"
  | "document"
  | "automated-subprocess"
  | "endpoint";

export type WorkflowCategory =
  | "planning"
  | "configuration"
  | "component-inventory"
  | "procurement"
  | "production"
  | "quality"
  | "finished-inventory"
  | "fulfilment";

export interface WorkflowNode {
  id: string;
  title: string;
  type: WorkflowNodeType;
  category: WorkflowCategory;
  description: string;
}

export type WorkflowEdgeStyle =
  | "required"
  | "decision"
  | "parallel"
  | "rework"
  | "replenishment"
  | "data-update";

export interface WorkflowEdge {
  id: string;
  source: string;
  target: string;
  label?: string;
  style: WorkflowEdgeStyle;
}

export const forceNWorkflowNodes: WorkflowNode[] = [
  { id: "stock-build-trigger", title: "Planned stock build", type: "event", category: "planning", description: "Starts production for a standard configuration ahead of a customer order, from a planned finished-stock target or from inventory falling below target." },
  { id: "select-configuration", title: "Select configuration and build quantity", type: "process", category: "planning", description: "Identifies which standard configuration to produce and how many units are needed to restore or maintain finished inventory." },
  { id: "configuration-package", title: "Configuration package", type: "document", category: "configuration", description: "The complete public-safe reference set for the configuration: BOM, Arena part numbers, assembly instructions, calibration procedures and scripts, lamination instructions, acceptance criteria." },
  { id: "component-inventory", title: "Component inventory", type: "data-store", category: "component-inventory", description: "Current recorded quantities of parts required for standard configurations, read for availability checks, written to on receipt and deduction." },
  { id: "parts-availability-decision", title: "All required parts available?", type: "decision", category: "component-inventory", description: "Confirms the build can be kitted without waiting on a missing component. No routes to procurement; Yes continues to kitting." },
  { id: "procure-components", title: "Procure and receive components", type: "process", category: "procurement", description: "Orders missing or replenishment components and returns received parts to component inventory before the build continues." },
  { id: "kit-and-deduct-components", title: "Kit parts and deduct component inventory", type: "process", category: "component-inventory", description: "Collects the exact parts needed for the build and records those quantities as consumed." },
  { id: "component-threshold-check", title: "Automated minimum-stock check", type: "automated-subprocess", category: "component-inventory", description: "Runs after component deductions, comparing each remaining part quantity against its minimum stock threshold." },
  { id: "component-threshold-decision", title: "Any component below threshold?", type: "decision", category: "component-inventory", description: "If yes, replenishment is triggered in parallel; it does not block the current build. If no, or the current kit is already complete, production continues." },
  { id: "trigger-component-replenishment", title: "Trigger component replenishment", type: "process", category: "procurement", description: "Creates the requirement to restore a component to its minimum or target stock level before another build needs it." },
  { id: "assembly", title: "Assembly", type: "process", category: "production", description: "Builds the unit using the configuration approved parts and assembly work instructions." },
  { id: "primary-calibration", title: "Primary calibration", type: "process", category: "quality", description: "Tests the assembled unit before lamination against configuration-specific acceptance criteria." },
  { id: "primary-calibration-decision", title: "Primary calibration passed?", type: "decision", category: "quality", description: "Prevents an unsuccessful unit from advancing to lamination. Fail routes to diagnosis and rework; pass continues to lamination." },
  { id: "diagnose-and-rework", title: "Diagnose and rework", type: "process", category: "production", description: "Investigates a failed calibration, corrects the unit through the defined path, and returns it to assembly for another attempt. Shared by both quality gates." },
  { id: "lamination", title: "Lamination", type: "process", category: "production", description: "Completes lamination, run only after the unit passes primary calibration." },
  { id: "secondary-calibration", title: "Secondary calibration", type: "process", category: "quality", description: "Re-tests the unit after lamination to confirm it still meets required performance and quality criteria." },
  { id: "secondary-quality-decision", title: "Secondary calibration and QA passed?", type: "decision", category: "quality", description: "The final release gate before a unit can be recorded as sellable finished inventory." },
  { id: "complete-production-records", title: "Complete QA and production records", type: "document", category: "quality", description: "Completes the traceability and release documentation required before a verified unit enters finished inventory." },
  { id: "post-to-finished-inventory", title: "Post unit to finished inventory", type: "process", category: "finished-inventory", description: "Records the completed, verified unit as available finished product under its specific configuration." },
  { id: "finished-inventory", title: "Finished Dev System inventory", type: "data-store", category: "finished-inventory", description: "Completed, tested, documented standard units ready to be allocated to incoming orders." },
  { id: "customer-order", title: "Customer order received", type: "event", category: "fulfilment", description: "Starts the order-fulfilment flow for a requested configuration." },
  { id: "finished-availability-decision", title: "Requested configuration available?", type: "decision", category: "fulfilment", description: "Determines whether the order can be fulfilled from finished inventory. No creates a build requirement; yes allocates a unit." },
  { id: "create-order-build-requirement", title: "Create build requirement", type: "process", category: "planning", description: "Creates a production requirement when the requested configuration is not available in finished inventory, returning to production planning." },
  { id: "allocate-finished-unit", title: "Allocate finished unit", type: "process", category: "fulfilment", description: "Reserves an available completed unit for the specific order." },
  { id: "prepare-and-pack", title: "Prepare and pack order", type: "process", category: "fulfilment", description: "Prepares the allocated unit, accessories, records, and packaging for shipment." },
  { id: "shipment", title: "Shipment", type: "process", category: "fulfilment", description: "Transfers the completed order to the shipping and delivery process." },
  { id: "deduct-finished-inventory", title: "Deduct finished inventory", type: "automated-subprocess", category: "finished-inventory", description: "Updates the available quantity for the shipped configuration after allocation or shipment." },
  { id: "finished-threshold-decision", title: "Finished stock below target?", type: "decision", category: "finished-inventory", description: "If yes, triggers a planned stock build, returning to the top of the production system. If no, the configuration stays available." },
  { id: "inventory-available-end", title: "Inventory remains available", type: "endpoint", category: "finished-inventory", description: "The stable state where the configuration remains sufficiently stocked, no immediate replenishment build required." },
];

export const forceNWorkflowEdges: WorkflowEdge[] = [
  { id: "e01", source: "stock-build-trigger", target: "select-configuration", style: "required" },
  { id: "e02", source: "select-configuration", target: "configuration-package", style: "required" },
  { id: "e03", source: "configuration-package", target: "parts-availability-decision", style: "required" },
  { id: "e04", source: "component-inventory", target: "parts-availability-decision", label: "quantity on hand", style: "data-update" },
  { id: "e05", source: "parts-availability-decision", target: "procure-components", label: "No, missing", style: "decision" },
  { id: "e06", source: "procure-components", target: "component-inventory", label: "receive and record", style: "data-update" },
  { id: "e08", source: "parts-availability-decision", target: "kit-and-deduct-components", label: "Yes, available", style: "decision" },
  { id: "e09", source: "kit-and-deduct-components", target: "component-inventory", label: "deduct quantities", style: "data-update" },
  { id: "e10", source: "kit-and-deduct-components", target: "component-threshold-check", style: "required" },
  { id: "e11", source: "component-threshold-check", target: "component-threshold-decision", style: "required" },
  { id: "e12", source: "component-threshold-decision", target: "trigger-component-replenishment", label: "Yes, below threshold", style: "replenishment" },
  { id: "e13", source: "trigger-component-replenishment", target: "procure-components", label: "parallel replenishment", style: "parallel" },
  { id: "e14", source: "component-threshold-decision", target: "assembly", label: "No, sufficient", style: "decision" },
  { id: "e16", source: "assembly", target: "primary-calibration", style: "required" },
  { id: "e17", source: "primary-calibration", target: "primary-calibration-decision", style: "required" },
  { id: "e18", source: "primary-calibration-decision", target: "diagnose-and-rework", label: "Fail", style: "rework" },
  { id: "e19", source: "diagnose-and-rework", target: "assembly", label: "correct and rebuild", style: "rework" },
  { id: "e20", source: "primary-calibration-decision", target: "lamination", label: "Pass", style: "decision" },
  { id: "e21", source: "lamination", target: "secondary-calibration", style: "required" },
  { id: "e22", source: "secondary-calibration", target: "secondary-quality-decision", style: "required" },
  { id: "e23", source: "secondary-quality-decision", target: "diagnose-and-rework", label: "Fail, defined rework path", style: "rework" },
  { id: "e24", source: "secondary-quality-decision", target: "complete-production-records", label: "Pass", style: "decision" },
  { id: "e25", source: "complete-production-records", target: "post-to-finished-inventory", style: "required" },
  { id: "e26", source: "post-to-finished-inventory", target: "finished-inventory", label: "configuration quantity +1", style: "data-update" },
  { id: "e27", source: "customer-order", target: "finished-availability-decision", style: "required" },
  { id: "e28", source: "finished-inventory", target: "finished-availability-decision", label: "available quantity", style: "data-update" },
  { id: "e29", source: "finished-availability-decision", target: "create-order-build-requirement", label: "No, unavailable", style: "decision" },
  { id: "e30", source: "create-order-build-requirement", target: "select-configuration", label: "configuration and quantity", style: "replenishment" },
  { id: "e31", source: "finished-availability-decision", target: "allocate-finished-unit", label: "Yes, available", style: "decision" },
  { id: "e32", source: "allocate-finished-unit", target: "prepare-and-pack", style: "required" },
  { id: "e33", source: "prepare-and-pack", target: "shipment", style: "required" },
  { id: "e34", source: "shipment", target: "deduct-finished-inventory", style: "required" },
  { id: "e35", source: "deduct-finished-inventory", target: "finished-inventory", label: "update available quantity", style: "data-update" },
  { id: "e36", source: "deduct-finished-inventory", target: "finished-threshold-decision", style: "required" },
  { id: "e37", source: "finished-threshold-decision", target: "stock-build-trigger", label: "Yes, below target", style: "replenishment" },
  { id: "e38", source: "finished-threshold-decision", target: "inventory-available-end", label: "No, sufficient stock", style: "decision" },
];

export const forceNWorkflowNodeOrder = forceNWorkflowNodes.map((n) => n.id);
