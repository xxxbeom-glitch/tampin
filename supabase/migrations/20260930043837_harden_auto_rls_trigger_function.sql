-- The dashboard-created automatic-RLS event trigger does not need to be callable
-- through the Data API. Keep its DDL-trigger behavior while removing direct access.
revoke execute on function public.rls_auto_enable() from public, anon, authenticated;
