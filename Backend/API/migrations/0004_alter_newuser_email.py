# Generated by Django 4.1.1 on 2022-11-29 15:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('API', '0003_alter_comment_id_alter_post_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='newuser',
            name='email',
            field=models.EmailField(max_length=150),
        ),
    ]
