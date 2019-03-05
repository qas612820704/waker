import Pattern from 'url-pattern';

export default class App {
  patterns = []

  handle(event) {
    const { uri, method: reqMethod, payload } = event.data;

    for (const { pattern, handler, method } of this.patterns) {
      if (reqMethod !== method)
        continue;

      const match = pattern.match(uri);
      if (!match)
        continue;

      return handler({ match, payload });
    }

    throw new Error(`No handler for ${uri}`);
  }

  registerHandler({ pattern, ...restArgs }) {
    this.patterns.push({
      pattern: new Pattern(pattern),
      ...restArgs,
    });
  }

  get(pattern, handler) {
    return this.registerHandler({
      method: 'get',
      pattern,
      handler,
    });
  }
  post(pattern, handler) {
    return this.registerHandler({
      method: 'post',
      pattern,
      handler,
    });
  }
  put(pattern, handler) {
    return this.registerHandler({
      method: 'put',
      pattern,
      handler,
    });
  }
  delete(pattern, handler) {
    return this.registerHandler({
      method: 'delete',
      pattern,
      handler,
    });
  }
}

