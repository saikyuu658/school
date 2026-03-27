from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import MinValueValidator, MaxValueValidator

class User(AbstractUser):
    ROLE_CHOICES = (
        ('PROFESSOR', 'Professor'),
        ('ALUNO', 'Aluno'),
    )
    role = models.CharField(max_length=10, choices=ROLE_CHOICES)
    turma = models.CharField(max_length=50, null=True, blank=True) 

class Atividade(models.Model):
    professor = models.ForeignKey(User, on_delete=models.CASCADE, related_name='atividades_criadas')
    titulo = models.CharField(max_length=255)
    descricao = models.TextField()
    turma = models.CharField(max_length=50)
    data_entrega = models.DateTimeField()
    
    def __str__(self):
        return self.titulo

class Resposta(models.Model):
    aluno = models.ForeignKey(User, on_delete=models.CASCADE, related_name='minhas_respostas')
    atividade = models.ForeignKey(Atividade, on_delete=models.CASCADE, related_name='respostas')
    texto = models.TextField()
    nota = models.DecimalField(max_digits=4, decimal_places=2, null=True, blank=True, 
                               validators=[MinValueValidator(0), MaxValueValidator(10)])
    feedback = models.TextField(null=True, blank=True)
    
    class Meta:
        unique_together = ('aluno', 'atividade') # Garante apenas 1 resposta por atividade

    def __str__(self):
        return f"Resposta de {self.aluno.username} para {self.atividade.titulo}"