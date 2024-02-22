/*
 * @Author: JY jitengjiao@bytedance.com
 * @Date: 2024-02-20 20:41:02
 * @LastEditors: JY jitengjiao@bytedance.com
 * @LastEditTime: 2024-02-22 17:44:25
 * @FilePath: /next-doc/pages/api/articles.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export default async function handler(req, res) {
    res.status(200).json({
        code: 0, 
        data: 123,
    })
}