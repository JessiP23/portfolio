# Generated by Django 4.2.7 on 2024-01-13 16:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('projects', '0009_aboutme'),
    ]

    operations = [
        migrations.AlterField(
            model_name='aboutme',
            name='accomplishments',
            field=models.TextField(),
        ),
        migrations.AlterField(
            model_name='aboutme',
            name='contact_information',
            field=models.TextField(),
        ),
    ]
