import initSqlJs, { type SqlJsStatic } from 'sql.js';

declare global {
  var __TAMPIN_SQLJS__: SqlJsStatic | undefined;
}

beforeAll(async () => {
  global.__TAMPIN_SQLJS__ = await initSqlJs();
});

function getSqlJs(): SqlJsStatic {
  if (!global.__TAMPIN_SQLJS__) {
    throw new Error('sql.js is not initialized. Ensure jest-sqljs-setup runs first.');
  }
  return global.__TAMPIN_SQLJS__;
}

export { getSqlJs };
