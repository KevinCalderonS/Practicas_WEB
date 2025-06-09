Entidades:
Flashcard(Tarjeta didáctica)
Descripción: Representa una tarjeta de estudio individual con pregunta, respuesta e imagen opcional.

Justificación: Es la entidad central del dominio de flashcards, contiene toda la información necesaria para el aprendizaje y seguimiento del progreso del usuario.

Category(categoria)
Descripción: Representa una categoría temática para organizar las flashcards (ej: "Common 600 words", "Science").

Justificación: Esencial para la organización y filtrado de contenido, permite a los usuarios estructurar su aprendizaje por temas específicos.

StudySession(Sesion de estudio)
Descripción: Registra una sesión de estudio individual con métricas de rendimiento.

Justificación: Fundamental para el seguimiento del progreso de aprendizaje y análisis de rendimiento. Permite generar estadísticas y adaptar el contenido.

User(usuario)
Descripción: Representa un usuario del sistema con su perfil y progreso de aprendizaje.

Justificación: Necesario para la personalización del aprendizaje, seguimiento del progreso individual y gamificación del sistema.

StudyProgress(Progreso de estudio)
Descripción: Rastrea el progreso individual de cada usuario con cada flashcard específica.

Justificación: Esencial para implementar algoritmos de repetición espaciada y personalizar la experiencia de aprendizaje según el dominio individual de cada tarjeta

Relaciones Principales
User ↔ Flashcard (1:N)

Un usuario puede crear múltiples flashcards
Cada flashcard pertenece a un usuario específico
User ↔ Category (1:N)

Un usuario puede crear múltiples categorías
Cada categoría pertenece a un usuario (o es pública)
Category ↔ Flashcard (1:N)

Una categoría puede contener múltiples flashcards
Cada flashcard pertenece a una categoría específica
User ↔ StudySession (1:N)

Un usuario puede tener múltiples sesiones de estudio
Cada sesión pertenece a un usuario específico
User ↔ StudyProgress (1:N)

Un usuario tiene progreso en múltiples flashcards
Cada registro de progreso es único por usuario-flashcard
Flashcard ↔ StudyProgress (1:N)

Una flashcard puede tener progreso de múltiples usuarios
Cada progreso está vinculado a una flashcard específica
