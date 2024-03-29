# Generated by Django 4.2.7 on 2024-01-12 08:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('projects', '0002_alter_project_technology'),
    ]

    operations = [
        migrations.CreateModel(
            name='ContactInformation',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('email', models.EmailField(max_length=254)),
                ('message', models.TextField()),
            ],
        ),
        migrations.AlterField(
            model_name='project',
            name='imageURL',
            field=models.ImageField(upload_to='projects/uploads'),
        ),
        migrations.AlterField(
            model_name='project',
            name='technology',
            field=models.ImageField(blank=True, upload_to='projects/technologies'),
        ),
    ]
