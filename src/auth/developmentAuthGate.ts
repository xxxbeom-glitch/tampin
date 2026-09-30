/** Release builds must fail closed; only development client builds may use the local bypass. */
export function isDevelopmentAuthBypassEnabled(): boolean {
  return __DEV__;
}
