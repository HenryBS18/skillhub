import { type RouteConfig, index, layout, route } from "@react-router/dev/routes"

export default [
  layout('layouts/index-layout.tsx', [
    index('routes/index.tsx'),
    route('peserta', 'routes/student.tsx'),
    route('kelas', 'routes/class.tsx')
  ])

] satisfies RouteConfig
