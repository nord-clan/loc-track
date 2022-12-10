export class NodeSettings {
  // private _visualComponents: VisualComponents<INodeComponentSettings, INodeVisualComponentProps> =
  //   new VisualComponents<INodeComponentSettings, INodeVisualComponentProps>({
  //     [COMPONENT_DEFAULT_TYPE]: createNode({ ports: [] }),
  //     input_output_horizontal: createInputOutputHorizontalNode(),
  //     input_output_vertical: createInputOutputVerticalNode(),
  //     input_vertical: createInputVerticalNode(),
  //     input_horizontal: createInputHorizontalNode(),
  //     output_vertical: createOutputVerticalNode(),
  //     output_horizontal: createOutputHorizontalNode(),
  //     star: createStarNode()
  //   });
  // private _gridSnap: Point | null;
  // constructor() {
  //   this.setGridSnap();
  //   makeAutoObservable(this);
  // }
  // get visualComponents() {
  //   return this._visualComponents;
  // }
  // import = (obj?: INodesSettings) => {
  //   this._visualComponents.import(obj);
  //   this.setGridSnap(obj?.gridSnap);
  // };
  // get gridSnap() {
  //   return this._gridSnap;
  // }
  // setGridSnap = (gridSnap?: number | Point) => {
  //   if (!gridSnap) {
  //     this._gridSnap = null;
  //   } else if (typeof gridSnap === 'number') {
  //     this._gridSnap = [gridSnap, gridSnap];
  //   } else if (Array.isArray(gridSnap) && gridSnap.length === 2) {
  //     this._gridSnap = gridSnap;
  //   }
  // };
}

// export interface INodeComponentSettings {
//   ports?: IPortFinalState[];
// }

// export type INodeVisualComponentProps<
//   TSettings extends INodeComponentSettings = INodeComponentSettings
// > = IVisualComponentProps<NodeState, TSettings>;

// export interface INodesSettings
//   extends IVisualComponentsObject<
//     INodeComponentSettings,
//     INodeVisualComponentProps<INodeComponentSettings>
//   > {
//   gridSnap?: number | Point;
// }
