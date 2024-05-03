from django.shortcuts import render
from projects.models import Project

def project_index(request):
    projects = Project.objects.all()
    context = {
        "projects": projects,
    }
    return render(request, "projects/project_index.html", context)

def about_me(request):
    return render(request, 'projects/about_me.html')

#Apps request
def universe_app(request):
    return render(request, 'projects/universe.html')

def quiz_app(request):
    return render(request, 'projects/quiz_app.html')

def business_application(request): 
    return render(request, 'projects/business_application.html')

def math(request):
    return render(request, 'projects/math.html')