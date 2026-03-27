from rest_framework import generics, permissions, status, filters
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied, ValidationError
from django.utils.timezone import now
from .models import User, Atividade, Resposta
from .serializers import UserSerializer, AtividadeSerializer, RespostaSerializer, CorrecaoSerializer

# 1. Cadastro de Usuários (Adição solicitada)
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]

# 2. GET /me/atividades e POST /atividades
class MeAtividadesView(generics.ListCreateAPIView):
    serializer_class = AtividadeSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [filters.SearchFilter]
    search_fields = ['titulo', 'descricao'] # 2. Pesquisa pela atividade

    def get_queryset(self):
        user = self.request.user
        if user.role == 'ALUNO':
            return Atividade.objects.filter(turma=user.turma)
        elif user.role == 'PROFESSOR':
            return Atividade.objects.filter(professor=user)
        return Atividade.objects.none()

    def perform_create(self, serializer):
        if self.request.user.role != 'PROFESSOR':
            raise PermissionDenied("Apenas professores podem criar atividades.")
        serializer.save(professor=self.request.user)

# 3. GET /me/respostas e POST /respostas
class MeRespostasView(generics.ListCreateAPIView):
    serializer_class = RespostaSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        if self.request.user.role != 'ALUNO':
            raise PermissionDenied("Apenas alunos possuem respostas.")
        return Resposta.objects.filter(aluno=self.request.user)

    def perform_create(self, serializer):
        user = self.request.user
        if user.role != 'ALUNO':
            raise PermissionDenied("Apenas alunos podem responder.")
        
        atividade = serializer.validated_data['atividade']
        if atividade.turma != user.turma:
            raise PermissionDenied("Você não pode responder atividades de outra turma.")
        
        serializer.save(aluno=user)

# 4. GET /atividades/{id}/respostas/
class AtividadeRespostasView(generics.ListAPIView):
    serializer_class = RespostaSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.role != 'PROFESSOR':
            raise PermissionDenied("Apenas professores podem ver respostas de uma atividade.")
        
        atividade_id = self.kwargs['id']
        atividade = Atividade.objects.get(id=atividade_id)
        
        if atividade.professor != user:
            raise PermissionDenied("Você só pode ver respostas das suas próprias atividades.")
            
        return Resposta.objects.filter(atividade_id=atividade_id)

# 5. PATCH /respostas/{id}/
class RespostaDetailView(generics.UpdateAPIView):
    queryset = Resposta.objects.all()
    permission_classes = [permissions.IsAuthenticated]
    lookup_field = 'id'

    def get_serializer_class(self):
        if self.request.user.role == 'PROFESSOR':
            return CorrecaoSerializer
        return RespostaSerializer

    def perform_update(self, serializer):
        user = self.request.user
        resposta = self.get_object()

        if user.role == 'ALUNO':
            if resposta.aluno != user:
                raise PermissionDenied("Você só pode editar sua própria resposta.")
            if resposta.atividade.data_entrega < now():
                raise ValidationError("O prazo para envio já foi encerrado.")
            serializer.save()

        elif user.role == 'PROFESSOR':
            if resposta.atividade.professor != user:
                raise PermissionDenied("Você só pode corrigir atividades que criou.")
            serializer.save()