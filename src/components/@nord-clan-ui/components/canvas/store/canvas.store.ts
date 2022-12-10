import type { IDiagramSettings } from './diagram-settings.store';
import { DiagramSettings } from './diagram-settings.store';
import { DiagramState } from './diagram-state.store';

export class CanvasStore {
  private _diagramState: DiagramState;
  private _diagramSettings: DiagramSettings;

  // private _nodesStore: NodesStore;
  // private _nodesSettings: NodesSettings;
  // private _callbacks: Callbacks;

  // private _linksStore: LinksStore;
  // private _selectionState: SelectionState;
  // private _dragState: DragState;
  // private _commandExecutor: CommandExecutor;

  // private _portsSettings: PortsSettings;
  // private _linksSettings: LinksSettings;

  constructor() {
    console.log('CanvasStore');
    this._diagramSettings = new DiagramSettings();
    this._diagramState = new DiagramState(this);
    // this._nodesSettings = new NodesSettings();
    // this._callbacks = new Callbacks(this);
    // this._commandExecutor = new CommandExecutor(this);
    // this._nodesStore = new NodesStore(this);
    // this._selectionState = new SelectionState();
    // this._dragState = new DragState(this._selectionState, this._callbacks);
  }

  get diagramSettings() {
    return this._diagramSettings;
  }

  get diagramState() {
    return this._diagramState;
  }

  // get nodesStore() {
  //   return this._nodesStore;
  // }

  // get linksStore() {
  //   return this._linksStore;
  // }

  // get nodesSettings() {
  //   return this._nodesSettings;
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
  //   this._nodesStore.import(nodes);
  //   this._diagramState.reportWhenImportedStateRendered();
  // };

  // importSettings = (settings?: ISettings) => {
  //   this._diagramSettings.import(settings?.diagram);
  //   this._nodesSettings.import(settings?.nodes);
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
