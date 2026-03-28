# core/management/commands/seed.py
from django.core.management.base import BaseCommand
from core.models import User

class Command(BaseCommand):
    help = 'Cria usuários iniciais para teste'

    def handle(self, *args, **kwargs):
        usuarios = [
            # Professores
            dict(username='prof_ana', email='ana@escola.edu.br', password='123456', role='PROFESSOR', turma=None),
            dict(username='prof_carlos', email='carlos@escola.edu.br', password='123456', role='PROFESSOR', turma=None),

            # Alunos — um por turma
            dict(username='aluno_a1', email='aluno_a1@escola.edu.br', password='123456', role='ALUNO', turma='A'),
            dict(username='aluno_a2', email='aluno_a2@escola.edu.br', password='123456', role='ALUNO', turma='A'),
            dict(username='aluno_b1', email='aluno_b1@escola.edu.br', password='123456', role='ALUNO', turma='B'),
        ]

        for u in usuarios:
            password = u.pop('password')
            user, created = User.objects.get_or_create(username=u['username'], defaults=u)
            if created:
                user.set_password(password)
                user.save()
                self.stdout.write(self.style.SUCCESS(f'Criado: {user.username}'))
            else:
                self.stdout.write(f'Já existe: {user.username}')