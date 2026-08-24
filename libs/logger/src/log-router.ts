export type LogDestination = {
  write: (msg: string) => unknown;
};

export type LogRouter = LogDestination & {
  add: (destination: LogDestination) => void;
};

export function createLogRouter(
  destinations: LogDestination[] = []
): LogRouter {
  const sinks = [...destinations];

  return {
    add(destination) {
      sinks.push(destination);
    },
    write(msg) {
      for (const destination of sinks) {
        destination.write(msg);
      }
    },
  };
}
