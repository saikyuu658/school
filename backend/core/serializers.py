from rest_framework import serializers
from .models import User, Atividade, Resposta
from django.contrib.auth.hashers import make_password

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
    class Meta:
        model = Resposta
        fields = '__all__'
        read_only_fields = ['aluno', 'nota', 'feedback'] # Aluno não pode se dar nota

class CorrecaoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Resposta
        fields = ['nota', 'feedback']