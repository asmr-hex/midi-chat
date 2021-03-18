FROM python:3.7
RUN mkdir /app 
COPY server /app
COPY pyproject.toml /app 
WORKDIR /
ENV PYTHONPATH=${PYTHONPATH}:${PWD} 
RUN pip3 install poetry
RUN poetry config virtualenvs.create false
RUN poetry install --no-dev
ENTRYPOINT ["poetry", "run", "uvicorn", "app.main:app"]
CMD ["--host", "0.0.0.0", "--port", "8080"]
