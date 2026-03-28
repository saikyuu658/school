from rest_framework import serializers
from .models import User, Atividade, Resposta
from django.contrib.auth.hashers import make_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class EmailTokenObtainPairSerializer(TokenObtainPairSerializer):
    username_field = 'email'

class UserMeSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'role', 'turma',]
        read_only_fields = ['role', 'turma']

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password', 'role', 'turma']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        validated_data['password'] = make_password(validated_data['password'])
        return super().create(validated_data)

class AtividadeSerializer(serializers.ModelSerializer):

    class Meta:
        model = Atividade
        fields = '__all__'
        read_only_fields = ['professor']

class RespostaSerializer(serializers.ModelSerializer):
    aluno = UserSerializer(read_only=True)
    
    atividade_id = serializers.PrimaryKeyRelatedField(
        queryset=Atividade.objects.all(), 
        source='atividade'
    )
    atividade_titulo = serializers.ReadOnlyField(source='atividade.titulo')
    class Meta:
        model = Resposta
        fields = [
            'id', 
            'texto', 
            'aluno',
            'atividade_id',     
            'atividade_titulo', 
            'nota', 
            'feedback'
        ]
        read_only_fields = ['aluno', 'nota', 'feedback'] 

class CorrecaoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Resposta
        fields = ['nota', 'feedback']