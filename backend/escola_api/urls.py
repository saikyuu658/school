from django.contrib import admin
from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from core.views import (
    RegisterView, MeAtividadesView, MeRespostasView, 
    AtividadeRespostasView, RespostaDetailView
)

urlpatterns = [
    path('admin/', admin.site.urls),
    
    # Autenticação e Cadastro
    path('auth/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('auth/login/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('auth/register/', RegisterView.as_view(), name='register'),
    
    # Atividades
    path('me/atividades/', MeAtividadesView.as_view(), name='me_atividades'),
    path('atividades/', MeAtividadesView.as_view(), name='atividades_create'),
    
    # Respostas
    path('me/respostas/', MeRespostasView.as_view(), name='me_respostas'),
    path('respostas/', MeRespostasView.as_view(), name='respostas_create'),
    path('atividades/<int:id>/respostas/', AtividadeRespostasView.as_view(), name='atividade_respostas'),
    path('respostas/<int:id>/', RespostaDetailView.as_view(), name='resposta_patch'),
]