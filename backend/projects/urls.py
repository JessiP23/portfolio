from django.urls import path
from . import views
from django.conf import settings
from django.conf.urls.static import static
from .views import about_me, universe_app, quiz_app
 
urlpatterns = [ 
    path("", views.project_index, name="project_index"),
    path('about_me', about_me, name="about_me"),
    path('universe_app', universe_app, name="universe_app"),
    path('quiz_app', quiz_app, name="quiz_app"),
    ]
if settings.DEBUG:
    #static files during development
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
