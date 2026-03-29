from django.contrib import admin
from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from core.views import    EmailTokenObtainPairView, MeAtividadesView, MeRespostasView
from core.views import  AtividadeRespostasView, RespostaDetailView, UserMeView


urlpatterns = [
    path('admin/', admin.site.urls),
    
    # Autenticação e Cadastro
    path('api/auth/login/', EmailTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/auth/login/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/auth/me/', UserMeView.as_view(), name='me'),
    
    # Atividades
    path('api/me/atividades/', MeAtividadesView.as_view(), name='me_atividades'),
    path('api/atividades/', MeAtividadesView.as_view(), name='atividades_create'),
    
    # Respostas
    path('api/me/respostas/', MeRespostasView.as_view(), name='me_respostas'),
    path('api/respostas/', MeRespostasView.as_view(), name='respostas_create'),
    path('api/atividades/<int:id>/respostas/', AtividadeRespostasView.as_view(), name='atividade_respostas'),
    path('api/respostas/<int:id>/', RespostaDetailView.as_view(), name='resposta_patch'),
]