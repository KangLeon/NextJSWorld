/*
 * @Author: JY jitengjiao@bytedance.com
 * @Date: 2024-02-21 23:59:05
 * @LastEditors: JY jitengjiao@bytedance.com
 * @LastEditTime: 2024-02-22 19:01:43
 * @FilePath: /next-doc/src/pages/editor/new.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
'use client'

import '@uiw/react-md-editor/markdown-editor.css'
import '@uiw/react-markdown-preview/markdown.css'
import dynamic from 'next/dynamic'
import { NextPage } from 'next'
import { useState } from 'react'

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), {
  ssr: false,
})

const NewEditor = () => {
  const [value, setValue] = useState('**Hello world!!!**')
  return (
    <div>
      <MDEditor value={value} onChange={setValue}></MDEditor>
    </div>
  )
}

export default NewEditor
