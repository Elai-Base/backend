// createUserList:此函数执行会返回一个数组
function createUserList() {
  return [
    {
      user_id: 1,
      nickname: "test1",
    },
  ];
}

//对外暴露数据
export default [
  {
    url: "/api/user/login",
    method: "post",
    response: ({ body: { string: any } }) => {
      const { username, password } = body;
      return { status: 200, data: { code: 0, data: "", message: "" } };
    },
  },
];
