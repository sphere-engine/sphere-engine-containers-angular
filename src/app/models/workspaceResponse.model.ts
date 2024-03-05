export interface WorkspaceResponse {
  readonly message: string;
  readonly workspace: Workspace;
}

interface Project {
  readonly id: string;
  readonly name: string;
}

interface Workspace {
  readonly id: string;
  readonly project: Project;
}
