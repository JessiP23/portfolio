from django.shortcuts import render
from projects.models import Project
from .forms import ContactForm

def project_index(request):
    projects = Project.objects.all()
    form = ContactForm()
    context = {
        "projects": projects,
        "form": form
    }
    return render(request, "projects/project_index.html", context)

def project_detail(request, pk):
    project = Project.objects.get(pk=pk)
    context = {
        "project": project
    }
    return render(request, "projects/project_detail.html", context)

def contact_view(request):
    if request.method == 'POST':
        form = ContactForm(request.POST)
        if form.is_valid():
            form.save()
            return render(request, 'projects/contact_submitted.html')
        
    else:
        form = ContactForm()

    return render(request, 'projects/contact.html', {'form': form})

def contact_submitted_view(request):
    return render(request, 'contact_submitted.html')

def about_me(request):
    return render(request, 'projects/about_me.html')

#Apps request
def universe_app(request):
    return render(request, 'projects/universe.html')

def quiz_app(request):
    return render(request, 'projects/quiz_app.html')
