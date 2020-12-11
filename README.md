# A Inlight website example using Next.js and DatoCMS

### Local setup

#### Set up environment variables

Next, copy the `.env.example` file in this directory to `.env` (which will be ignored by Git):

```bash
cp .env.example .env
```

Setup environment variables

#### Run the migrations to generate models and fields

```bash
volta install datocms-client
dato migrate --token=XYZ
```

#### Run your project locally

```bash
npm install
npm run dev
```

Your website should be up and running on [http://localhost:3000](http://localhost:3000)!
