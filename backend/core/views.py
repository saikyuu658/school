from rest_framework import generics, permissions, status, filters
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied, ValidationError
from django.utils.timezone import now
from .models import User, Atividade, Resposta
from .serializers import EmailTokenObtainPairSerializer, UserMeSerializer, UserSerializer, AtividadeSerializer, RespostaSerializer, CorrecaoSerializer
from rest_framework_simplejwt.views import TokenObtainPairView



class EmailTokenObtainPairView(TokenObtainPairView):
    serializer_class = EmailTokenObtainPairSerializer


class UserMeView(generics.RetrieveUpdateAPIView):
    serializer_class = UserMeSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user
class MeAtividadesView(generics.ListCreateAPIView):
    serializer_class = AtividadeSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [filters.SearchFilter]
    search_fields = ['titulo', 'descricao'] 

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
        
        if Resposta.objects.filter(aluno=user, atividade=atividade).exists():
            raise ValidationError("Você já enviou uma resposta para esta atividade.")
        
        serializer.save(aluno=user)

class AtividadeRespostasView(generics.ListAPIView):
    serializer_class = RespostaSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        atividade_id = self.kwargs.get('id')
        
        try:
            atividade = Atividade.objects.get(id=atividade_id)
        except Atividade.DoesNotExist:
            return Resposta.objects.none()

        if user.role == 'PROFESSOR':
            if atividade.professor != user:
                raise PermissionDenied("Você não tem permissão para ver as respostas desta atividade.")
            return Resposta.objects.filter(atividade=atividade)

        elif user.role == 'ALUNO':
            return Resposta.objects.filter(atividade=atividade, aluno=user)

        return Resposta.objects.none()

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


    
   