/*
 * @Author: JY jitengjiao@bytedance.com
 * @Date: 2024-02-20 21:41:03
 * @LastEditors: JY jitengjiao@bytedance.com
 * @LastEditTime: 2024-02-20 21:43:44
 * @FilePath: /next-doc/pages/api/user/login.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export default async function login(req, res) {
    const { phone, verify} = req.body
    res.status(200).json({
        code: 0, 
        data: '登录成功',
    })
}