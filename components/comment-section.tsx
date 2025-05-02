"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MessageSquare } from "lucide-react"
import { v4 as uuidv4 } from "@/lib/uuid"
import { formatDate } from "@/lib/utils"

interface Comment {
  id: string
  text: string
  author: string
  date: string
  avatar?: string
}

interface CommentSectionProps {
  obraId: string
}

export function CommentSection({ obraId }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([])
  const [newComment, setNewComment] = useState("")
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const { toast } = useToast()

  // Simular carregamento de comentários
  useEffect(() => {
    // Comentários específicos para cada obra
    const commentsByObraId: Record<string, Comment[]> = {
      "1": [
        {
          id: uuidv4(),
          text: "A ponte está ficando linda! Vai facilitar muito o acesso entre os núcleos da cidade.",
          author: "Maria Oliveira",
          date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
          avatar: "/images/avatars/avatar-1.png",
        },
        {
          id: uuidv4(),
          text: "Estou preocupado com o prazo. Já estamos em atraso comparado ao cronograma inicial.",
          author: "João Silva",
          date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
          avatar: "/images/avatars/avatar-2.png",
        },
      ],
      "2": [
        {
          id: uuidv4(),
          text: "Meus filhos estudam nesta escola e estão muito felizes com a reforma. As novas salas de aula são excelentes!",
          author: "Ana Santos",
          date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
          avatar: "/images/avatars/avatar-3.png",
        },
      ],
      "3": [
        {
          id: uuidv4(),
          text: "Por que a obra está paralisada? Precisamos urgentemente desta pavimentação.",
          author: "Carlos Ferreira",
          date: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
          avatar: "/images/avatars/avatar-4.png",
        },
        {
          id: uuidv4(),
          text: "Segundo informações da Secretaria de Obras, a paralisação é temporária devido a ajustes no projeto de drenagem.",
          author: "Patrícia Mendes",
          date: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
          avatar: "/images/avatars/avatar-5.png",
        },
      ],
      "4": [
        {
          id: uuidv4(),
          text: "Este hospital vai atender uma demanda muito importante da nossa região. Parabéns pela iniciativa!",
          author: "Roberto Almeida",
          date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
          avatar: "/images/avatars/avatar-6.png",
        },
      ],
      "5": [
        {
          id: uuidv4(),
          text: "A praça ficou linda! Já estou levando meus filhos para brincar lá nos finais de semana.",
          author: "Fernanda Costa",
          date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
          avatar: "/images/avatars/avatar-7.png",
        },
      ],
    }

    setComments(commentsByObraId[obraId] || [])
  }, [obraId])

  const handleAddComment = () => {
    if (!isLoggedIn) {
      toast({
        title: "Ação não permitida",
        description: "Você precisa estar logado para comentar.",
        variant: "destructive",
      })
      return
    }

    if (newComment.trim() === "") {
      toast({
        title: "Comentário vazio",
        description: "Por favor, escreva algo antes de enviar.",
        variant: "destructive",
      })
      return
    }

    const comment: Comment = {
      id: uuidv4(),
      text: newComment,
      author: "Cidadão Marabaense",
      date: new Date().toISOString(),
      avatar: "/images/avatars/avatar-user.png",
    }

    setComments([...comments, comment])
    setNewComment("")

    toast({
      title: "Comentário adicionado",
      description: "Seu comentário foi publicado com sucesso.",
    })
  }

  return (
    <Card className="shadow-sm">
      <CardHeader className="bg-slate-50 dark:bg-slate-900 border-b py-3 sm:py-4">
        <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
          <MessageSquare className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
          Comentários e Discussão Pública
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4 sm:pt-6 space-y-4 sm:space-y-6">
        <div className="space-y-3 sm:space-y-4">
          {comments.length === 0 ? (
            <p className="text-center py-6 sm:py-8 text-muted-foreground text-sm bg-slate-50 dark:bg-slate-900/50 rounded-md">
              Nenhum comentário ainda. Seja o primeiro a comentar!
            </p>
          ) : (
            comments.map((comment) => (
              <div
                key={comment.id}
                className="flex gap-3 sm:gap-4 p-3 sm:p-4 border rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors"
              >
                <Avatar className="h-8 w-8 sm:h-10 sm:w-10 flex-shrink-0">
                  <AvatarImage src={comment.avatar || "/images/avatars/avatar-default.png"} alt={comment.author} />
                  <AvatarFallback>{comment.author.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap justify-between items-start gap-1 sm:gap-2">
                    <p className="font-medium text-xs sm:text-sm">{comment.author}</p>
                    <p className="text-[10px] sm:text-xs text-muted-foreground">{formatDate(comment.date)}</p>
                  </div>
                  <p className="mt-1 break-words text-xs sm:text-sm">{comment.text}</p>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="pt-3 sm:pt-4 border-t">
          <Textarea
            placeholder={isLoggedIn ? "Escreva seu comentário..." : "Faça login para comentar..."}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            disabled={!isLoggedIn}
            className="mb-3 sm:mb-4 min-h-[80px] sm:min-h-[100px] text-sm"
          />
          <div className="flex flex-col xs:flex-row justify-between items-center gap-3 sm:gap-4">
            <Button
              type="button"
              variant={isLoggedIn ? "outline" : "default"}
              size="sm"
              className={isLoggedIn ? "" : "bg-blue-600 hover:bg-blue-700 w-full xs:w-auto"}
              onClick={() => setIsLoggedIn(!isLoggedIn)}
            >
              {isLoggedIn ? "Simular Logout" : "Simular Login para Comentar"}
            </Button>
            <Button
              type="button"
              onClick={handleAddComment}
              disabled={!isLoggedIn}
              size="sm"
              className={isLoggedIn ? "bg-blue-600 hover:bg-blue-700 w-full xs:w-auto" : "w-full xs:w-auto"}
            >
              Enviar Comentário
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
