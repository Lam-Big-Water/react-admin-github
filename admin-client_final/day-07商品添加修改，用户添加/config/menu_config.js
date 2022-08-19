// // 项目的菜单配置
// export default [
//         {
//         title: "首页", // 菜单标题名称
//         key: "/home", // 对应的 path
//         icon: <HomeOutlined/>, // 图标名称
//         },
//         {
//         title: "商品",
//         key: "/products",
//         icon: <AppstoreAddOutlined />,
//         children: [
//             // 子菜单列表
//             {
//             title: "品类管理",
//             key: "/category",
//             icon: <BarsOutlined />,
//             },
//             {
//             title: "商品管理",
//             key: "/product",
//             icon: <ToolOutlined />,
//             },
//         ],
//         },
//         {
//         title: "用户管理",
//         key: "/user",
//         icon: <UserOutlined />,
//         },
//         {
//         title: "角色管理",
//         key: "/role",
//         icon: <SafetyOutlined />,
//         },
//         {
//         title: "图形图表",
//         key: "/charts",
//         icon: <AreaChartOutlined/>,
//         children: [
//             {
//             title: "柱形图",
//             key: "/charts/bar",
//             icon: <BarChartOutlined/>,
//             },
//             {
//             title: "折线图",
//             key: "/charts/line",
//             icon: <LineChartOutlined/>,
//             },
//             {
//             title: "饼图",
//             key: "/charts/pie",
//             icon: <PieChartFilled/>,
//             },
//         ],
//         },
//     ];


// 项目的菜单配置
export default [
    {
    title: "首页", // 菜单标题名称
    key: "home", // 对应的 path
    icon: 'home', // 图标名称
    path: '/admin/home'//对应路径
    },
    {
    title: "商品",
    key: "prod_about",
    icon: 'appstore',
    children: [
        // 子菜单列表
        {
        title: "品类管理",
        key: "category",
        icon: 'unordered-list',
        path: '/admin/prod_about/category'
        },
        {
        title: "商品管理",
        key: "product",
        icon: 'tool',
        path: '/admin/prod_about/product'
        },
    ],
    },
    {
    title: "用户管理",
    key: "user",
    icon: 'user',
    path: '/admin/user'//对应路径
    },
    {
    title: "角色管理",
    key: "role",
    icon: 'user',
    path: '/admin/role'//对应路径
    },
    {
    title: "图形图表",
    key: "charts",
    icon: 'tool',
    children: [
        {
        title: "柱形图",
        key: "bar",
        icon: 'tool',
        path: '/admin/charts/bar'
    },
        {
        title: "折线图",
        key: "line",
        icon: 'tool',
        path: '/admin/charts/line'
    },
        {
        title: "饼图",
        key: "pie",
        icon: 'tool',
        path: '/admin/charts/pie'
    },
    ],
    },
];
