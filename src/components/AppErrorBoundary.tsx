import { Component, type ErrorInfo, type ReactNode } from 'react';

/** A missing cached chunk should offer recovery instead of a blank screen. */
export class AppErrorBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Unable to display this lesson', error, info.componentStack);
  }
  render() {
    if (this.state.failed) return <main className="container max-w-xl p-6 space-y-4">
      <h1 className="text-2xl font-bold">This lesson couldn’t load.</h1>
      <p>Your saved progress is still on this device. Reconnect if you’re offline, then try again.</p>
      <button className="btn-neon-primary" onClick={() => window.location.reload()}>Try again</button>
      <a href="/" className="btn-neon-secondary inline-block ml-3">Go home</a>
    </main>;
    return this.props.children;
  }
}
