export interface KotlinFile {
  filename: string;
  path: string;
  language: string;
  description: string;
  code: string;
}

export const kotlinProjectFiles: KotlinFile[] = [
  {
    filename: 'build.gradle.kts (Module :app)',
    path: 'app/build.gradle.kts',
    language: 'kotlin',
    description: 'Gradle build configuration with Jetpack Compose Material 3, Room DB, Navigation & Coroutines.',
    code: `plugins {
    alias(libs.plugins.android.application)
    alias(libs.plugins.kotlin.android)
    alias(libs.plugins.kotlin.compose)
    alias(libs.plugins.ksp) // Kotlin Symbol Processing for Room
}

android {
    namespace = "com.careermate.android"
    compileSdk = 35

    defaultConfig {
        applicationId = "com.careermate.android"
        minSdk = 26
        targetSdk = 35
        versionCode = 1
        versionName = "1.0.0"

        testInstrumentationRunner = "androidx.test.runner.AndroidJUnitRunner"
        vectorDrawables {
            useSupportLibrary = true
        }
    }

    signingConfigs {
        create("release") {
            storeFile = file(project.findProperty("KEYSTORE_PATH") ?: "release.keystore")
            storePassword = project.findProperty("KEYSTORE_PASSWORD")?.toString() ?: ""
            keyAlias = project.findProperty("KEY_ALIAS")?.toString() ?: ""
            keyPassword = project.findProperty("KEY_PASSWORD")?.toString() ?: ""
        }
    }

    buildTypes {
        release {
            isMinifyEnabled = true
            isShrinkResources = true
            proguardFiles(
                getDefaultProguardFile("proguard-android-optimize.txt"),
                "proguard-rules.pro"
            )
            signingConfig = signingConfigs.getByName("release")
        }
        debug {
            applicationIdSuffix = ".debug"
            isDebuggable = true
        }
    }

    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }
    kotlinOptions {
        jvmTarget = "17"
    }
    buildFeatures {
        compose = true
    }
}

dependencies {
    // Jetpack Compose BOM
    val composeBom = platform("androidx.compose:compose-bom:2024.12.01")
    implementation(composeBom)
    androidTestImplementation(composeBom)

    // Material 3 & Core Compose
    implementation("androidx.compose.material3:material3")
    implementation("androidx.compose.material:material-icons-extended")
    implementation("androidx.compose.ui:ui")
    implementation("androidx.compose.ui:ui-tooling-preview")
    debugImplementation("androidx.compose.ui:ui-tooling")
    debugImplementation("androidx.compose.ui:ui-test-manifest")

    // Navigation & Lifecycle
    implementation("androidx.navigation:navigation-compose:2.8.5")
    implementation("androidx.lifecycle:lifecycle-viewmodel-compose:2.8.7")
    implementation("androidx.lifecycle:lifecycle-runtime-compose:2.8.7")

    // Room Database (Local Persistence)
    val roomVersion = "2.6.1"
    implementation("androidx.room:room-runtime:$roomVersion")
    implementation("androidx.room:room-ktx:$roomVersion")
    ksp("androidx.room:room-compiler:$roomVersion")

    // Coroutines
    implementation("org.jetbrains.kotlinx:kotlinx-coroutines-android:1.9.0")

    // Unit & UI Testing
    testImplementation("junit:junit:4.13.2")
    testImplementation("org.jetbrains.kotlinx:kotlinx-coroutines-test:1.9.0")
    testImplementation("io.mockk:mockk:1.13.13")
    testImplementation("app.cash.turbine:turbine:1.2.0")
    androidTestImplementation("androidx.test.ext:junit:1.2.1")
    androidTestImplementation("androidx.test.espresso:espresso-core:3.6.1")
    androidTestImplementation("androidx.compose.ui:ui-test-junit4")
}`,
  },
  {
    filename: 'MainActivity.kt',
    path: 'app/src/main/java/com/careermate/android/MainActivity.kt',
    language: 'kotlin',
    description: 'Entry point setting up edge-to-edge layout, Material 3 theme, and root navigation scaffold.',
    code: `package com.careermate.android

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.ui.Modifier
import com.careermate.android.ui.navigation.CareerMateNavHost
import com.careermate.android.ui.theme.CareerMateTheme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        // Enables edge-to-edge drawing beneath Android status and gesture navigation bars
        enableEdgeToEdge()
        setContent {
            CareerMateTheme {
                Surface(
                    modifier = Modifier.fillMaxSize(),
                    color = MaterialTheme.colorScheme.background
                ) {
                    CareerMateNavHost()
                }
            }
        }
    }
}`,
  },
  {
    filename: 'Theme.kt',
    path: 'app/src/main/java/com/careermate/android/ui/theme/Theme.kt',
    language: 'kotlin',
    description: 'Material 3 dynamic color scheme support with Android 12+ Wallpaper dynamic colors and fallback palettes.',
    code: `package com.careermate.android.ui.theme

import android.os.Build
import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext

// Light M3 Colors
private val LightColorScheme = lightColorScheme(
    primary = Color(0xFF4F46E5),       // Indigo 600
    onPrimary = Color.White,
    primaryContainer = Color(0xFFE0E7FF),
    onPrimaryContainer = Color(0xFF312E81),
    secondary = Color(0xFF0D9488),     // Teal 600
    onSecondary = Color.White,
    background = Color(0xFFF8FAFC),    // Slate 50
    surface = Color.White,
    onBackground = Color(0xFF0F172A),
    onSurface = Color(0xFF0F172A)
)

// Dark M3 Colors
private val DarkColorScheme = darkColorScheme(
    primary = Color(0xFF818CF8),       // Indigo 400
    onPrimary = Color(0xFF1E1B4B),
    primaryContainer = Color(0xFF3730A3),
    onPrimaryContainer = Color(0xFFE0E7FF),
    secondary = Color(0xFF2DD4BF),     // Teal 400
    onSecondary = Color(0xFF134E4A),
    background = Color(0xFF090D16),    // Deep Slate 950
    surface = Color(0xFF0F172A),       // Slate 900
    onBackground = Color(0xFFF1F5F9),
    onSurface = Color(0xFFF1F5F9)
)

@Composable
fun CareerMateTheme(
    darkTheme: Boolean = isSystemInDarkTheme(),
    dynamicColor: Boolean = true,
    content: @Composable () -> Unit
) {
    val colorScheme = when {
        dynamicColor && Build.VERSION.SDK_INT >= Build.VERSION_CODES.S -> {
            val context = LocalContext.current
            if (darkTheme) dynamicDarkColorScheme(context) else dynamicLightColorScheme(context)
        }
        darkTheme -> DarkColorScheme
        else -> LightColorScheme
    }

    MaterialTheme(
        colorScheme = colorScheme,
        typography = Typography,
        content = content
    )
}`,
  },
  {
    filename: 'CareerMateDatabase.kt & ResumeEntity.kt',
    path: 'app/src/main/java/com/careermate/android/data/local/CareerMateDatabase.kt',
    language: 'kotlin',
    description: 'Room local database entities, type converters, and DAOs for offline-first storage.',
    code: `package com.careermate.android.data.local

import androidx.room.*
import kotlinx.coroutines.flow.Flow

@Entity(tableName = "resumes")
data class ResumeEntity(
    @PrimaryKey val id: String,
    val title: String,
    val fullName: String,
    val email: String,
    val phone: String,
    val location: String,
    val linkedin: String,
    val github: String,
    val summary: String,
    val educationJson: String,
    val experienceJson: String,
    val projectsJson: String,
    val skillsJson: String,
    val lastUpdated: Long = System.currentTimeMillis()
)

@Entity(tableName = "quiz_attempts")
data class QuizAttemptEntity(
    @PrimaryKey(autoGenerate = true) val id: Long = 0,
    val category: String,
    val totalScore: Int,
    val totalQuestions: Int,
    val durationSeconds: Int,
    val timestamp: Long = System.currentTimeMillis()
)

@Dao
interface CareerMateDao {
    @Query("SELECT * FROM resumes WHERE id = :id LIMIT 1")
    fun getResumeById(id: String): Flow<ResumeEntity?>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertOrUpdateResume(resume: ResumeEntity)

    @Query("SELECT * FROM quiz_attempts ORDER BY timestamp DESC")
    fun getAllQuizAttempts(): Flow<List<QuizAttemptEntity>>

    @Insert
    suspend fun recordQuizAttempt(attempt: QuizAttemptEntity)
}

@Database(entities = [ResumeEntity::class, QuizAttemptEntity::class], version = 1, exportSchema = false)
abstract class CareerMateDatabase : RoomDatabase() {
    abstract fun careerMateDao(): CareerMateDao
}`,
  },
  {
    filename: 'ResumeViewModel.kt',
    path: 'app/src/main/java/com/careermate/android/ui/viewmodel/ResumeViewModel.kt',
    language: 'kotlin',
    description: 'Jetpack ViewModel managing Resume state, ATS scoring calculations, and Room synchronization via StateFlow.',
    code: `package com.careermate.android.ui.viewmodel

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.careermate.android.data.local.CareerMateDao
import com.careermate.android.data.local.ResumeEntity
import kotlinx.coroutines.flow.*
import kotlinx.coroutines.launch

data class ResumeUiState(
    val fullName: String = "",
    val email: String = "",
    val phone: String = "",
    val summary: String = "",
    val atsScore: Int = 0,
    val isLoading: Boolean = false,
    val isSavedSuccess: Boolean = false
)

class ResumeViewModel(
    private val dao: CareerMateDao
) : ViewModel() {

    private val _uiState = MutableStateFlow(ResumeUiState())
    val uiState: StateFlow<ResumeUiState> = _uiState.asStateFlow()

    fun updateName(name: String) {
        _uiState.update { it.copy(fullName = name) }
        calculateAtsScore()
    }

    fun updateSummary(summary: String) {
        _uiState.update { it.copy(summary = summary) }
        calculateAtsScore()
    }

    private fun calculateAtsScore() {
        var score = 30 // Base presence score
        val current = _uiState.value
        if (current.fullName.isNotBlank()) score += 15
        if (current.email.contains("@")) score += 15
        if (current.summary.length >= 80) score += 20
        if (current.summary.contains(Regex("(led|built|architected|optimized|developed)", RegexOption.IGNORE_CASE))) {
            score += 20
        }
        _uiState.update { it.copy(atsScore = score.coerceAtMost(100)) }
    }

    fun saveResume(id: String) {
        viewModelScope.launch {
            val state = _uiState.value
            dao.insertOrUpdateResume(
                ResumeEntity(
                    id = id,
                    title = "Campus Placement ATS Resume",
                    fullName = state.fullName,
                    email = state.email,
                    phone = state.phone,
                    location = "",
                    linkedin = "",
                    github = "",
                    summary = state.summary,
                    educationJson = "[]",
                    experienceJson = "[]",
                    projectsJson = "[]",
                    skillsJson = "[]"
                )
            )
            _uiState.update { it.copy(isSavedSuccess = true) }
        }
    }
}`,
  },
  {
    filename: 'HomeScreen.kt (Jetpack Compose)',
    path: 'app/src/main/java/com/careermate/android/ui/screens/HomeScreen.kt',
    language: 'kotlin',
    description: 'Clean Material 3 Home Dashboard with readiness cards, placement streak badge, and navigation actions.',
    code: `package com.careermate.android.ui.screens

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.rounded.*
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun HomeScreen(
    studentName: String = "Aarav",
    streakDays: Int = 8,
    onNavigateToResume: () -> Unit,
    onNavigateToQuiz: () -> Unit,
    onNavigateToInterview: () -> Unit
) {
    Scaffold(
        topBar = {
            TopAppBar(
                title = {
                    Column {
                        Text(
                            text = "CareerMate",
                            style = MaterialTheme.typography.titleLarge,
                            fontWeight = FontWeight.Bold
                        )
                        Text(
                            text = "Welcome back, $studentName",
                            style = MaterialTheme.typography.bodySmall,
                            color = MaterialTheme.colorScheme.onSurfaceVariant
                        )
                    }
                },
                actions = {
                    FilledTonalButton(
                        onClick = {},
                        contentPadding = PaddingValues(horizontal = 12.dp, vertical = 6.dp)
                    ) {
                        Icon(Icons.Rounded.LocalFireDepartment, contentDescription = "Streak", modifier = Modifier.size(18.dp))
                        Spacer(modifier = Modifier.width(4.dp))
                        Text(text = "$streakDays Day Streak", style = MaterialTheme.typography.labelMedium)
                    }
                }
            )
        }
    ) { paddingValues ->
        LazyColumn(
            modifier = Modifier
                .fillMaxSize()
                .padding(paddingValues)
                .padding(horizontal = 16.dp),
            verticalArrangement = Arrangement.spacedBy(16.dp)
        ) {
            item {
                Card(
                    modifier = Modifier.fillMaxWidth(),
                    colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.primaryContainer)
                ) {
                    Column(modifier = Modifier.padding(20.dp)) {
                        Text(
                            text = "Placement Readiness: 86%",
                            style = MaterialTheme.typography.titleMedium,
                            fontWeight = FontWeight.Bold,
                            color = MaterialTheme.colorScheme.onPrimaryContainer
                        )
                        Spacer(modifier = Modifier.height(8.dp))
                        LinearProgressIndicator(
                            progress = { 0.86f },
                            modifier = Modifier.fillMaxWidth().height(8.dp),
                            color = MaterialTheme.colorScheme.primary
                        )
                        Spacer(modifier = Modifier.height(12.dp))
                        Text(
                            text = "Campus placements begin in 42 days. Keep your daily streak going!",
                            style = MaterialTheme.typography.bodySmall,
                            color = MaterialTheme.colorScheme.onPrimaryContainer
                        )
                    }
                }
            }

            item {
                Text(
                    text = "Quick Actions",
                    style = MaterialTheme.typography.titleMedium,
                    fontWeight = FontWeight.SemiBold
                )
            }

            item {
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.spacedBy(12.dp)
                ) {
                    ElevatedButton(
                        onClick = onNavigateToResume,
                        modifier = Modifier.weight(1f).height(64.dp)
                    ) {
                        Icon(Icons.Rounded.Description, contentDescription = null)
                        Spacer(modifier = Modifier.width(8.dp))
                        Text("Resume ATS")
                    }

                    ElevatedButton(
                        onClick = onNavigateToQuiz,
                        modifier = Modifier.weight(1f).height(64.dp)
                    ) {
                        Icon(Icons.Rounded.Quiz, contentDescription = null)
                        Spacer(modifier = Modifier.width(8.dp))
                        Text("Aptitude Quiz")
                    }
                }
            }
        }
    }
}`,
  },
];

export const testingAndAabGuide = {
  unitTesting: {
    title: '1. Unit Testing in Android (JUnit 4 & Coroutines)',
    description: 'Unit tests run on your local JVM without requiring a physical device or emulator.',
    command: './gradlew testDebugUnitTest',
    codeSnippet: `// File: app/src/test/java/com/careermate/android/ResumeViewModelTest.kt
package com.careermate.android

import app.cash.turbine.test
import com.careermate.android.data.local.CareerMateDao
import com.careermate.android.ui.viewmodel.ResumeViewModel
import io.mockk.coVerify
import io.mockk.mockk
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.ExperimentalCoroutinesApi
import kotlinx.coroutines.test.*
import org.junit.After
import org.junit.Assert.assertEquals
import org.junit.Before
import org.junit.Test

@OptIn(ExperimentalCoroutinesApi::class)
class ResumeViewModelTest {

    private val testDispatcher = StandardTestDispatcher()
    private val mockDao = mockk<CareerMateDao>(relaxed = true)
    private lateinit var viewModel: ResumeViewModel

    @Before
    fun setUp() {
        Dispatchers.setMain(testDispatcher)
        viewModel = ResumeViewModel(mockDao)
    }

    @After
    fun tearDown() {
        Dispatchers.resetMain()
    }

    @Test
    fun updateName_shouldIncreaseAtsScore() = runTest {
        viewModel.updateName("Aarav Sharma")
        testScheduler.advanceUntilIdle()

        viewModel.uiState.test {
            val item = awaitItem()
            assertEquals("Aarav Sharma", item.fullName)
            assert(item.atsScore >= 45) // Verified score increment
        }
    }
}`,
  },
  composeTesting: {
    title: '2. Jetpack Compose UI Testing (composeTestRule)',
    description: 'UI tests execute on an Android device or emulator to test component interaction and accessibility.',
    command: './gradlew connectedAndroidTest',
    codeSnippet: `// File: app/src/androidTest/java/com/careermate/android/HomeScreenTest.kt
package com.careermate.android

import androidx.compose.ui.test.*
import androidx.compose.ui.test.junit4.createComposeRule
import com.careermate.android.ui.screens.HomeScreen
import com.careermate.android.ui.theme.CareerMateTheme
import org.junit.Rule
import org.junit.Test

class HomeScreenTest {

    @get:Rule
    val composeTestRule = createComposeRule()

    @Test
    fun homeScreen_displaysPlacementReadinessCard() {
        var resumeClicked = false

        composeTestRule.setContent {
            CareerMateTheme {
                HomeScreen(
                    studentName = "Aarav",
                    streakDays = 8,
                    onNavigateToResume = { resumeClicked = true },
                    onNavigateToQuiz = {},
                    onNavigateToInterview = {}
                )
            }
        }

        // Verify Student Title is displayed
        composeTestRule
            .onNodeWithText("Welcome back, Aarav")
            .assertIsDisplayed()

        // Verify Resume Quick Action Button and simulate click
        composeTestRule
            .onNodeWithText("Resume ATS")
            .assertIsDisplayed()
            .performClick()

        assert(resumeClicked)
    }
}`,
  },
  aabGeneration: {
    title: '3. Signed Android App Bundle (AAB) Generation for Google Play',
    description: 'Step-by-step instructions for creating a production release keystore and generating a signed .aab bundle.',
    steps: [
      {
        step: 1,
        title: 'Generate Release Keystore',
        command: `keytool -genkey -v -keystore release.keystore -alias careermate -keyalg RSA -keysize 2048 -validity 10000`,
        note: 'Store release.keystore securely outside source control. Keep the alias and passwords safe.',
      },
      {
        step: 2,
        title: 'Configure gradle.properties (Never commit passwords to Git)',
        command: `# In ~/.gradle/gradle.properties or CI/CD secrets:
KEYSTORE_PATH=/path/to/release.keystore
KEYSTORE_PASSWORD=YourStrongKeystorePassword
KEY_ALIAS=careermate
KEY_PASSWORD=YourStrongKeyPassword`,
        note: 'Keep your credentials in local environment or GitHub Secrets.',
      },
      {
        step: 3,
        title: 'Build the Signed Android App Bundle',
        command: `./gradlew bundleRelease`,
        note: 'Gradle will output the optimized App Bundle at: app/build/outputs/bundle/release/app-release.aab',
      },
      {
        step: 4,
        title: 'Deploy to Google Play Console',
        command: `1. Open https://play.google.com/apps/publish\n2. Select "Internal Testing" or "Production" track\n3. Create new release and drop app-release.aab\n4. Enable Google Play App Signing`,
        note: 'Play App Signing automatically generates optimized APK splits for each user device architecture (arm64-v8a, armeabi-v7a, x86_64).',
      },
    ],
  },
};
