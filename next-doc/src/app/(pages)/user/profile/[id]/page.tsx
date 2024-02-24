/*
 * @Author: JY jitengjiao@bytedance.com
 * @Date: 2024-02-24 19:45:50
 * @LastEditors: JY jitengjiao@bytedance.com
 * @LastEditTime: 2024-02-24 20:18:26
 * @FilePath: /next-doc/src/app/(pages)/user/profile/[id]/page.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

'use client'

import { Button, Form, Input, message } from 'antd'
import request from '../../../../../service/fetch'
import { useEffect } from 'react'

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
}

const tailLayout = {
  wrapperCol: { offset: 4 },
}

const Page = ({ params: { id } }: { params: { id: number } }) => {
  const [form] = Form.useForm()

  useEffect(() => {
    requestGetProfile()
  }, [form])

  const requestGetProfile = () => {
    if (id === null || id === undefined) {
      console.log('跳出请求了' + id)
      return
    }
    console.log('发起请求了')
    request
      .post('/api/user/profile', {
        userId: id,
      })
      .then((res: any) => {
        if (res?.code === 0) {
          form.setFieldsValue(res?.data)
        } else {
          message.error(res?.msg || '文章获取失败')
        }
      })
  }

  const requestUpdateProfile = (value: any) => {
    console.log('发起请求了')
    request
      .post('/api/user/update', {
        ...value,
      })
      .then((res: any) => {
        if (res?.code === 0) {
          form.setFieldsValue(res?.data)
        } else {
          message.error(res?.msg || '用户信息更新失败')
        }
      })
  }

  return (
    <div className="py-10">
      <div className="flex flex-col">
        <div className=" text-2xl font-bold">个人资料</div>
        <div className="mt-10">
          <Form {...layout} form={form} onFinish={requestUpdateProfile}>
            <Form.Item label="用户名" name="nickname">
              <Input placeholder="请输入用户名"></Input>
            </Form.Item>

            <Form.Item label="职业" name="job">
              <Input placeholder="请输入职位"></Input>
            </Form.Item>

            <Form.Item label="个人介绍" name="introduce">
              <Input placeholder="请输入个人介绍"></Input>
            </Form.Item>

            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit">
                保存修改
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default Page
