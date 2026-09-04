export interface LogDestination {
  flush?: () => Promise<void>;
  write: (msg: string) => unknown;
}

export type LogRouter = LogDestination & {
  add: (destination: LogDestination) => void;
  flush: () => Promise<void>;
};

export function createLogRouter(
  destinations: LogDestination[] = []
): LogRouter {
  const sinks = [...destinations];

  return {
    add(destination) {
      sinks.push(destination);
    },
    async flush() {
      await Promise.all(sinks.map((sink) => sink.flush?.()));
    },
    write(msg) {
      for (const destination of sinks) {
        try {
          destination.write(msg);
        } catch (error) {
          process.stderr.write(
            `[logger] destination failed: ${error instanceof Error ? error.message : String(error)}\n`
          );
        }
      }
    },
  };
}
