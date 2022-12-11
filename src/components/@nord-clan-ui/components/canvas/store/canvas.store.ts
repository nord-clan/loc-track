import type { IDiagramSettings } from './diagram/diagram-settings.store';
import { DiagramSettingsStore } from './diagram/diagram-settings.store';
import { NodeSettings } from './node/node-settings';
import { DiagramStateStore } from './diagram/diagram-state.store';
import { NodeStore } from './node/node.store';

export class CanvasStore {
  private _diagramStateStore: DiagramStateStore;
  private _diagramSettingsStore: DiagramSettingsStore;
  private _nodeStore: NodeStore;
  private _nodeSettings: NodeSettings;
  // private _selectionState: SelectionState;

  // private _callbacks: Callbacks;

  // private _linksStore: LinksStore;
  // private _dragState: DragState;
  // private _commandExecutor: CommandExecutor;

  // private _portsSettings: PortsSettings;
  // private _linksSettings: LinksSettings;

  constructor() {
    this._diagramSettingsStore = new DiagramSettingsStore();
    this._diagramStateStore = new DiagramStateStore(this);
    this._nodeStore = new NodeStore(this);
    this._nodeSettings = new NodeSettings();

    // this._callbacks = new Callbacks(this);
    // this._commandExecutor = new CommandExecutor(this);
    // this._selectionState = new SelectionState();
    // this._dragState = new DragState(this._selectionState, this._callbacks);
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
    return this._nodeSettings;
  }

  // get linksStore() {
  //   return this._linksStore;
  // }

  // get linksSettings() {
  //   return this._linksSettings;
  // }

  // get portsSettings() {
  //   return this._portsSettings;
  // }

  // get callbacks() {
  //   return this._callbacks;
  // }

  // get selectionState() {
  //   return this._selectionState;
  // }

  // get dragState() {
  //   return this._dragState;
  // }

  // get commandExecutor() {
  //   return this._commandExecutor;
  // }

  // importState = (nodes?: INodeState[]) => {
  //   this._nodeStore.import(nodes);
  //   this._diagramState.reportWhenImportedStateRendered();
  // };

  // importSettings = (settings?: ISettings) => {
  //   this._nodsSettings.import(settings?.nodes);
  //   this._diagramSettings.import(settings?.diagram);
  //   this._callbacks.import(settings?.callbacks);
  // };

  // export = (): { nodes: INodeExport[]; links: ILinkState[] } => ({
  //   nodes: this._nodesStore.export(),
  //   links: this._linksStore.export()
  // });
}

export interface ISettings {
  diagram?: IDiagramSettings;
  // nodes?: INodesSettings;
  // callbacks?: ICallbacks;
}
