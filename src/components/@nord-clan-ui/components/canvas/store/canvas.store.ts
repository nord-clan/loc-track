import type { INodeExport, INodeState } from './node/node-state.store';
import type { INodesSettings } from './node/node-settings.store';
import type { IDiagramState } from './diagram/diagram-state.store';
import type { ICallbacks } from './callbacks.store';
import { DiagramSettingsStore } from './diagram/diagram-settings.store';
import { NodeSettingsStore } from './node/node-settings.store';
import { DiagramStateStore } from './diagram/diagram-state.store';
import { NodeStore } from './node/node.store';
import { CallbacksStore } from './callbacks.store';

export class CanvasStore {
  private _diagramStateStore: DiagramStateStore;
  private _diagramSettingsStore: DiagramSettingsStore;
  private _nodeStore: NodeStore;
  private _nodeSettingsStore: NodeSettingsStore;
  private _callbacksStore: CallbacksStore;

  constructor() {
    this._diagramSettingsStore = new DiagramSettingsStore();
    this._diagramStateStore = new DiagramStateStore(this);
    this._nodeStore = new NodeStore(this);
    this._nodeSettingsStore = new NodeSettingsStore();
    this._callbacksStore = new CallbacksStore(this);
  }

  get diagramSettings() {
    return this._diagramSettingsStore;
  }

  get diagramState() {
    return this._diagramStateStore;
  }

  get nodeStore() {
    return this._nodeStore;
  }

  get nodeSettings() {
    return this._nodeSettingsStore;
  }

  get callbacks() {
    return this._callbacksStore;
  }

  importState = (nodes?: INodeState[]) => {
    this._nodeStore.import(nodes);
    this._diagramStateStore.reportWhenImportedStateRendered();
  };

  importSettings = (settings?: ISettings) => {
    this._nodeSettingsStore.import(settings?.nodes);
    this._diagramStateStore.import(settings?.diagram);
    this._callbacksStore.import(settings?.callbacks);
  };

  export = (): { nodes: INodeExport[] } => ({
    nodes: this._nodeStore.export()
  });
}

export interface ISettings {
  diagram?: IDiagramState;
  nodes?: INodesSettings;
  callbacks?: ICallbacks;
}
