from django.urls import path
from . import views
from django.conf import settings
from django.conf.urls.static import static
from .views import contact_view, contact_submitted_view, about_me, universe_app, quiz_app
 
urlpatterns = [
    path("", views.project_index, name="project_index"),
    path("<int:pk>/", views.project_detail, name="project_detail"),
    path("contact/", contact_view, name='contact_view'),
    path('contact/success/', contact_submitted_view, name="contact_sucess"),
    path('about_me', about_me, name="about_me"),
    path('universe_app', universe_app, name="universe_app"),
    path('quiz_app', quiz_app, name="quiz_app"),
    ]
if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
