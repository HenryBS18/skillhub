import { type RouteConfig, index, layout, prefix, route } from "@react-router/dev/routes"

export default [
  layout('layouts/index-layout.tsx', [
    index('routes/index.tsx'),
    route('peserta', 'routes/student.tsx'),
    route('kelas', 'routes/class.tsx')
  ]),
  ...prefix('/actions', [
    route('/student', 'routes/actions/student-actions.ts'),
    route('/class', 'routes/actions/class-actions.ts'),
  ]),
] satisfies RouteConfig
