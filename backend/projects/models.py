from django.db import models

class Project(models.Model):
    title = models.CharField(max_length=600)
    description = models.TextField(max_length = 600)

    def __str__(self):
        return self.title

class ImageRendering(models.Model):
    project = models.ForeignKey('Project', related_name="images", on_delete = models.CASCADE)
    image = models.ImageField(upload_to='project_images')

    def __str__(self):
        return f"{self.project.title} - Image {self.pk}"

class TechnologyImage(models.Model):
    project = models.ForeignKey('Project', related_name = "technology_images", on_delete = models.CASCADE)
    technology_image = models.ImageField(upload_to='technology_images')

    def __str__(self):
        return f"{self.project.title} - Technology Image {self.pk}"

