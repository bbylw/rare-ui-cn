"use client";

import { Component, type ReactNode } from "react";

type Props = {
  name: string;
  children: ReactNode;
};

type State = {
  error: Error | null;
};

/**
 * A failing preview should never take the whole gallery down — WebGL and
 * Canvas support varies a lot between environments.
 */
export class PreviewBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  render() {
    if (this.state.error) {
      return (
        <div className="flex max-w-sm flex-col items-center gap-2 text-center">
          <p className="text-sm font-medium text-foreground">
            该预览无法在此环境中渲染
          </p>
          <p className="text-xs text-muted-foreground">
            {this.props.name} 可能依赖 WebGL 或 Canvas，请在本机运行查看效果。
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}
