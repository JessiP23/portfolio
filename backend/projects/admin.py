from django.contrib import admin
from django.forms import inlineformset_factory
from .models import Project, ImageRendering, TechnologyImage
#Display multiple images in Django Admin
class ImageRenderingInline(admin.TabularInline):
    model = ImageRendering
    extra = 1

    ProjectImageFormSet = inlineformset_factory(Project, ImageRendering, fields=('image',), extra=1)

class TechnologyImageInline(admin.TabularInline):
    model = TechnologyImage
    extra = 1

class ProjectAdmin(admin.ModelAdmin):
    inlines = [ImageRenderingInline, TechnologyImageInline]



admin.site.register(Project, ProjectAdmin)
