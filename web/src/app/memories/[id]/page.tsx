import dayjs from 'dayjs'
import ptBr from 'dayjs/locale/pt-br'
import { ArrowLeft } from 'lucide-react'
import { api } from '../../../lib/api'
import Image from 'next/image'
import Link from 'next/link'
import { cookies } from 'next/headers'
import { DeleteButton } from '../../../components/DeleteButton'

dayjs.locale(ptBr)

type MemoryPageProps = {
  params: {
    id: string
  }
}

interface Memory {
  id: string
  coverUrl: string
  content: string
  createdAt: string
}

export default async function MemoryPage({ params }: MemoryPageProps) {
  const memoryId = params.id

  const token = cookies().get('token')?.value
  const response = await api.get(`/memories/${memoryId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const memory: Memory = response.data

  return (
    <div className="flex flex-col gap-10 p-8">
      <div className="space-y-4">
        <div className="flex w-full flex-row items-center justify-between">
          <Link
            href="/"
            className="flex flex-row items-center text-sm text-gray-200 hover:text-gray-100"
          >
            <ArrowLeft />
            Voltar
          </Link>
          <DeleteButton token={token} memoryId={memory.id} />
        </div>
        <time className="text-small -ml-8 flex items-center gap-2 text-gray-100 before:h-px before:w-5 before:bg-gray-50">
          {dayjs(memory.createdAt).format('D[ de ]MMMM[, ]YYYY')}
        </time>
        <Image
          src={memory.coverUrl}
          alt=""
          width={592}
          height={280}
          className="aspect-video w-full rounded-lg object-cover"
        />
        <p className="text-lg leading-relaxed text-gray-100">
          {memory.content}
        </p>
      </div>
    </div>
  )
}
