'use client'

import { Trash } from 'lucide-react'
import { api } from '../lib/api'
import { useRouter } from 'next/navigation'

type ButtonProps = {
  token?: string
  memoryId: string
}

export function DeleteButton(props: ButtonProps) {
  const router = useRouter()

  async function handleDeleteMemory() {
    await api.delete(`/memories/${props.memoryId}`, {
      headers: {
        Authorization: `Bearer ${props.token}`,
      },
    })

    router.push('/')
    router.refresh()
  }

  return (
    <button
      onClick={handleDeleteMemory}
      className="text-small upercase flex flex-row items-center gap-2 rounded-full bg-red-500 px-4 py-2 leading-none text-white hover:bg-red-600"
    >
      <Trash size={16} />
      Excluir Memória
    </button>
  )
}
