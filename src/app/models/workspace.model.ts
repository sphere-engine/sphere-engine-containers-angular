export interface Workspace {
  readonly id: string;
  bigSize: boolean;
  show: boolean;
  subscribed: boolean;
  loaded: boolean;
  readonly events: Event[];
}

export interface Event {
  readonly name: string;
  subscribed: false;
}
