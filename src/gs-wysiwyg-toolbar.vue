<template>
	<!-- S:New Editor Toolbar -->
	<div>
		<v-toolbar class="gs-custom" dense>
			<!-- S:Work Flow -->
			<v-divider vertical></v-divider>
			<v-tooltip bottom>
				<template v-slot:activator="{ on }">
					<v-btn icon tile v-on="on" @click="erase">
						<v-icon>mdi-eraser</v-icon>
					</v-btn>
				</template>
				<span>{{ Lang('editor.toolbar.erase') }}</span>
			</v-tooltip>
			<v-tooltip bottom>
				<template v-slot:activator="{ on }">
					<v-btn icon tile v-on="on" @click="undo">
						<v-icon>mdi-undo</v-icon>
					</v-btn>
				</template>
				<span>{{ Lang('editor.toolbar.undo') }}</span>
			</v-tooltip>
			<v-tooltip bottom>
				<template v-slot:activator="{ on }">
					<v-btn icon tile v-on="on" @click="redo">
						<v-icon>mdi-redo</v-icon>
					</v-btn>
				</template>
				<span>{{ Lang('editor.toolbar.redo') }}</span>
			</v-tooltip>
			<!-- E:Work Flow -->
			<v-divider vertical></v-divider>
			<!-- S:Text Align -->
			<v-tooltip bottom>
				<template v-slot:activator="{ on }">
					<v-btn icon tile class="d-md-none" v-on="on" @click="changeAlign('auto')">
						<v-icon v-text="'mdi-format-align-' + align[toggle.align]"></v-icon>
					</v-btn>
				</template>
				<span v-text="Lang('editor.toolbar.align-' + align[toggle.align])"></span>
			</v-tooltip>
			<v-btn-toggle
				v-model="toggle.align"
				class="custom d-none d-lg-flex pa-0"
				dense
				group
				madatory>
				<v-tooltip bottom>
					<template v-slot:activator="{ on }">
						<v-btn icon tile v-on="on" class="pa-0 mx-0" @click="changeAlign('left')">
							<v-icon>mdi-format-align-left</v-icon>
						</v-btn>
					</template>
					<span>{{ Lang('editor.toolbar.align-left') }}</span>
				</v-tooltip>
				<v-tooltip bottom>
					<template v-slot:activator="{ on }">
						<v-btn icon tile v-on="on" class="pa-0 mx-0" @click="changeAlign('center')">
							<v-icon>mdi-format-align-center</v-icon>
						</v-btn>
					</template>
					<span>{{ Lang('editor.toolbar.align-center') }}</span>
				</v-tooltip>
				<v-tooltip bottom>
					<template v-slot:activator="{ on }">
						<v-btn icon tile v-on="on" class="pa-0 mx-0" @click="changeAlign('right')">
							<v-icon>mdi-format-align-right</v-icon>
						</v-btn>
					</template>
					<span>{{ Lang('editor.toolbar.align-right') }}</span>
				</v-tooltip>
				<v-tooltip bottom>
					<template v-slot:activator="{ on }">
						<v-btn icon tile v-on="on" class="pa-0 mx-0" @click="changeAlign('justify')">
							<v-icon>mdi-format-align-justify</v-icon>
						</v-btn>
					</template>
					<span>{{ Lang('editor.toolbar.align-justify') }}</span>
				</v-tooltip>
			</v-btn-toggle>
			<!-- E:Text Align -->
			<v-btn-toggle
				class="custom pa-0"
				dense
				group
				madatory>
				<v-tooltip bottom>
					<template v-slot:activator="{ on }">
						<v-btn icon tile class="d-md-none pa-0 mx-0" @click="textBarToggle" active-class="white" v-on="on">
							<v-icon>mdi-format-title</v-icon>
						</v-btn>
					</template>
					<span>{{ Lang('editor.toolbar.text-menu') }}</span>
				</v-tooltip>
			</v-btn-toggle>
			<!-- S:Text Color -->
			<div class="d-none d-lg-flex pa-0">
				<v-divider vertical></v-divider>
				<v-menu 
					:close-on-content-click="false"
					offset-y
					transition="slide-y-transition"
					color="white"
					v-model="toggle.tColorView0"
					fixed
					bottom>
					<template v-slot:activator="{ on: menu }">
						<v-tooltip bottom>
							<template v-slot:activator="{ on: tooltip }">
								<v-btn icon tile v-on="{ ...tooltip, ...menu }">
									<v-icon>mdi-format-color-text</v-icon>
								</v-btn>
							</template>
							<span>{{ Lang('editor.toolbar.text-color') }}</span>
						</v-tooltip>
					</template>
					<v-color-picker
						:hide-mode-switch="true"
						v-model="toggle.tColor"
						class="custom-picker"
						mode="hexa"
						show-swatches></v-color-picker>
					<v-card tile color="white" align="right">
						<v-btn text color="grey darken-1" @click="toggle.tColorView0=false; textFrontColorChange();" tile>{{ Lang('apply') }}</v-btn>
					</v-card>
				</v-menu>
				<v-menu 
					:close-on-content-click="false"
					offset-y
					transition="slide-y-transition"
					color="white"
					v-model="toggle.bColorView0"
					fixed
					bottom>
					<v-color-picker 
						:hide-mode-switch="true"
						v-model="toggle.bColor"
						class="custom-picker"
						mode="hexa"
						show-swatches></v-color-picker>
					<template v-slot:activator="{ on: menu }">
						<v-tooltip bottom>
							<template v-slot:activator="{ on: tooltip }">
								<v-btn icon tile v-on="{ ...tooltip, ...menu }">
									<v-icon>mdi-format-color-fill</v-icon>
								</v-btn>
							</template>
							<span>{{ Lang('editor.toolbar.bg-color') }}</span>
						</v-tooltip>
					</template>
					<v-card tile color="white" align="right">
						<v-btn text color="grey darken-1" @click="toggle.bColorView0=false; textBackColorChange();" tile>{{ Lang('apply') }}</v-btn>
					</v-card>
				</v-menu>
			</div>
			<!-- E:Text Color -->
			<!-- S:Utility -->
			<div class="d-flex pa-0">
				<v-divider vertical class="d-flex d-md-none d-lg-flex"></v-divider>
				<v-tooltip bottom>
					<template v-slot:activator="{ on }">
						<v-btn icon tile v-on="on" @click="insertPicture">
							<v-icon>mdi-image-multiple</v-icon>
						</v-btn>
					</template>
					<span>{{ Lang('editor.toolbar.picture') }}</span>
				</v-tooltip>
				<v-tooltip bottom>
					<template v-slot:activator="{ on }">
						<v-btn icon tile v-on="on" @click="insertTable">
							<v-icon>mdi-table-large-plus</v-icon>
						</v-btn>
					</template>
					<span>{{ Lang('editor.toolbar.table') }}</span>
				</v-tooltip>
				<v-tooltip bottom>
					<template v-slot:activator="{ on }">
						<v-btn icon tile v-on="on" @click="viewHTML">
							<v-icon>mdi-xml</v-icon>
						</v-btn>
					</template>
					<span>{{ Lang('editor.toolbar.source') }}</span>
				</v-tooltip>
				<v-tooltip bottom>
					<template v-slot:activator="{ on }">
						<v-btn icon tile v-on="on" @click="viewMarkDown">
							<v-icon>mdi-markdown</v-icon>
						</v-btn>
					</template>
					<span>{{ Lang('editor.toolbar.markdown') }}</span>
				</v-tooltip>
			</div>
			<!-- E:Utility -->
			<!-- S:Text Etc -->
			<div class="d-none d-md-flex pa-0">
				<v-divider vertical></v-divider>
				<v-overflow-btn
					depressed
					label="Code"
					hide-details
					class="pa-0"
					overflow
					:items="code.list"
					v-model="code.cur"
					@change="codeBlock"
					></v-overflow-btn>
				<v-overflow-btn
					depressed
					label="Tag"
					name="tag"
					hide-details
					class="pa-0"
					overflow
					:items="tag.list"
					v-model="tag.cur"
					@change="tagChange"
					></v-overflow-btn>
				<v-overflow-btn
					depressed
					label="Font"
					name="font"
					hide-details
					class="pa-0"
					overflow
					:items="font.list"
					v-model="font.cur"
					@change="fontChange"
					></v-overflow-btn>
				<v-overflow-btn
					depressed
					label="Size"
					name="size"
					hide-details
					class="pa-0"
					overflow
					:items="size.list"
					v-model="size.cur"
					@change="sizeChange"
					></v-overflow-btn>
			</div>
			<!-- E:Text Etc -->
			<!-- S:Text Format -->
			<v-btn-toggle 
				v-model="toggle.format"
				class="d-none d-lg-flex pa-0 custom"
				dense
				group
				multiple
				madatory>
				<v-divider vertical></v-divider>
				<v-tooltip bottom>
					<template v-slot:activator="{ on }">
						<v-btn icon tile v-on="on" class="pa-0 mx-0" @click="toggleBold">
							<v-icon>mdi-format-bold</v-icon>
						</v-btn>
					</template>
					<span>{{ Lang('editor.toolbar.bold') }}</span>
				</v-tooltip>
				<v-tooltip bottom>
					<template v-slot:activator="{ on }">
						<v-btn icon tile v-on="on" class="pa-0 mx-0" @click="toggleItalic">
							<v-icon>mdi-format-italic</v-icon>
						</v-btn>
					</template>
					<span>{{ Lang('editor.toolbar.italic') }}</span>
				</v-tooltip>
				<v-tooltip bottom>
					<template v-slot:activator="{ on }">
						<v-btn icon tile v-on="on" class="pa-0 mx-0" @click="toggleUnderline">
							<v-icon>mdi-format-underline</v-icon>
						</v-btn>
					</template>
					<span>{{ Lang('editor.toolbar.underline') }}</span>
				</v-tooltip>
				<v-tooltip bottom>
					<template v-slot:activator="{ on }">
						<v-btn icon tile v-on="on" class="pa-0 mx-0" @click="toggleStrike">
							<v-icon>mdi-format-strikethrough-variant</v-icon>
						</v-btn>
					</template>
					<span>{{ Lang('editor.toolbar.strike') }}</span>
				</v-tooltip>
			</v-btn-toggle>
			<v-btn-toggle 
				v-model="toggle.super_sub"
				class="d-none d-lg-flex pa-0 custom"
				dense
				group
				madatory>
				<v-divider vertical></v-divider>
				<v-tooltip bottom>
					<template v-slot:activator="{ on }">
						<v-btn icon tile v-on="on" class="pa-0 mx-0" @click="toggleSub">
							<v-icon>mdi-format-subscript</v-icon>
						</v-btn>
					</template>
					<span>{{ Lang('editor.toolbar.sub') }}</span>
				</v-tooltip>
				<v-tooltip bottom>
					<template v-slot:activator="{ on }">
						<v-btn icon tile v-on="on" class="pa-0 mx-0" @click="toggleSuper">
							<v-icon>mdi-format-superscript</v-icon>
						</v-btn>
					</template>
					<span>{{ Lang('editor.toolbar.super') }}</span>
				</v-tooltip>
			</v-btn-toggle>
			<div class="d-none d-lg-flex pa-0">
				<v-divider vertical></v-divider>
				<v-tooltip bottom>
					<template v-slot:activator="{ on }">
						<v-btn icon tile v-on="on" @click="addLink">
							<v-icon>mdi-link-variant-plus</v-icon>
						</v-btn>
					</template>
					<span>{{ Lang('editor.toolbar.link') }}</span>
				</v-tooltip>
				<v-tooltip bottom>
					<template v-slot:activator="{ on }">
						<v-btn icon tile v-on="on" @click="delLink">
							<v-icon>mdi-link-variant-minus</v-icon>
						</v-btn>
					</template>
					<span>{{ Lang('editor.toolbar.unlink') }}</span>
				</v-tooltip>
			</div>
			<!-- E:Text Format -->
		</v-toolbar>
		<v-toolbar id="toolbar-2" class="custom-toolbar d-none d-md-flex d-lg-none" dense>
			<!-- S:Text Align -->
			<v-btn-toggle
				v-model="toggle.align"
				class="custom d-flex pa-0"
				dense
				group
				madatory>
				<v-tooltip bottom>
					<template v-slot:activator="{ on }">
						<v-btn icon tile v-on="on" class="pa-0 mx-0" @click="changeAlign('left')">
							<v-icon>mdi-format-align-left</v-icon>
						</v-btn>
					</template>
					<span>{{ Lang('editor.toolbar.align-left') }}</span>
				</v-tooltip>
				<v-tooltip bottom>
					<template v-slot:activator="{ on }">
						<v-btn icon tile v-on="on" class="pa-0 mx-0" @click="changeAlign('center')">
							<v-icon>mdi-format-align-center</v-icon>
						</v-btn>
					</template>
					<span>{{ Lang('editor.toolbar.align-center') }}</span>
				</v-tooltip>
				<v-tooltip bottom>
					<template v-slot:activator="{ on }">
						<v-btn icon tile v-on="on" class="pa-0 mx-0" @click="changeAlign('right')">
							<v-icon>mdi-format-align-right</v-icon>
						</v-btn>
					</template>
					<span>{{ Lang('editor.toolbar.align-right') }}</span>
				</v-tooltip>
				<v-tooltip bottom>
					<template v-slot:activator="{ on }">
						<v-btn icon tile v-on="on" class="pa-0 mx-0" @click="changeAlign('justify')">
							<v-icon>mdi-format-align-justify</v-icon>
						</v-btn>
					</template>
					<span>{{ Lang('editor.toolbar.align-justify') }}</span>
				</v-tooltip>
			</v-btn-toggle>
			<!-- E:Text Align -->
			<!-- S:Text Color -->
			<v-divider vertical></v-divider>
				<v-menu 
					:close-on-content-click="false"
					offset-y
					transition="slide-y-transition"
					color="white"
					v-model="toggle.tColorView1"
					fixed
					bottom>
					<template v-slot:activator="{ on: menu }">
						<v-tooltip bottom>
							<template v-slot:activator="{ on: tooltip }">
								<v-btn icon tile v-on="{ ...tooltip, ...menu }">
									<v-icon>mdi-format-color-text</v-icon>
								</v-btn>
							</template>
							<span>{{ Lang('editor.toolbar.text-color') }}</span>
						</v-tooltip>
					</template>
					<v-color-picker 
						:hide-mode-switch="true"
						v-model="toggle.tColor"
						class="custom-picker"
						mode="hexa"
						show-swatches></v-color-picker>
					<v-card tile color="white" align="right">
						<v-btn text color="grey darken-1" @click="toggle.tColorView1=false; textFrontColorChange();" tile>{{ Lang('apply') }}</v-btn>
					</v-card>
				</v-menu>
				<v-menu 
					:close-on-content-click="false"
					offset-y
					transition="slide-y-transition"
					color="white"
					v-model="toggle.bColorView1"
					fixed
					bottom>
					<v-color-picker 
						:hide-mode-switch="true"
						v-model="toggle.bColor"
						class="custom-picker"
						mode="hexa"
						show-swatches></v-color-picker>
					<template v-slot:activator="{ on: menu }">
						<v-tooltip bottom>
							<template v-slot:activator="{ on: tooltip }">
								<v-btn icon tile v-on="{ ...tooltip, ...menu }">
									<v-icon>mdi-format-color-fill</v-icon>
								</v-btn>
							</template>
							<span>{{ Lang('editor.toolbar.bg-color') }}</span>
						</v-tooltip>
					</template>
					<v-card tile color="white" align="right">
						<v-btn text color="grey darken-1" @click="toggle.bColorView1=false; textBackColorChange();" tile>{{ Lang('apply') }}</v-btn>
					</v-card>
				</v-menu>
			<!-- E:Text Color -->
			<!-- S:Text Format -->
			<v-divider vertical></v-divider>
			<v-btn-toggle 
				v-model="toggle.format"
				class="pa-0 custom"
				dense
				group
				multiple
				madatory>
				<v-tooltip bottom>
					<template v-slot:activator="{ on }">
						<v-btn v-model="toggle.bold" icon tile v-on="on" class="pa-0 mx-0" @click="toggleBold">
							<v-icon>mdi-format-bold</v-icon>
						</v-btn>
					</template>
					<span>{{ Lang('editor.toolbar.bold') }}</span>
				</v-tooltip>
				<v-tooltip bottom>
					<template v-slot:activator="{ on }">
						<v-btn v-model="toggle.italic" icon tile v-on="on" class="pa-0 mx-0" @click="toggleItalic">
							<v-icon>mdi-format-italic</v-icon>
						</v-btn>
					</template>
					<span>{{ Lang('editor.toolbar.italic') }}</span>
				</v-tooltip>
				<v-tooltip bottom>
					<template v-slot:activator="{ on }">
						<v-btn v-model="toggle.underline" icon tile v-on="on" class="pa-0 mx-0" @click="toggleUnderline">
							<v-icon>mdi-format-underline</v-icon>
						</v-btn>
					</template>
					<span>{{ Lang('editor.toolbar.underline') }}</span>
				</v-tooltip>
				<v-tooltip bottom>
					<template v-slot:activator="{ on }">
						<v-btn v-model="toggle.strike" icon tile v-on="on" class="pa-0 mx-0" @click="toggleStrike">
							<v-icon>mdi-format-strikethrough-variant</v-icon>
						</v-btn>
					</template>
					<span>{{ Lang('editor.toolbar.strike') }}</span>
				</v-tooltip>
			</v-btn-toggle>
			<v-btn-toggle 
				v-model="toggle.super_sub"
				class="pa-0 custom"
				dense
				group
				madatory>
				<v-divider vertical></v-divider>
				<v-tooltip bottom>
					<template v-slot:activator="{ on }">
						<v-btn icon tile v-on="on" class="pa-0 mx-0" @click="toggleSub">
							<v-icon>mdi-format-subscript</v-icon>
						</v-btn>
					</template>
					<span>{{ Lang('editor.toolbar.sub') }}</span>
				</v-tooltip>
				<v-tooltip bottom>
					<template v-slot:activator="{ on }">
						<v-btn icon tile v-on="on" class="pa-0 mx-0" @click="toggleSuper">
							<v-icon>mdi-format-superscript</v-icon>
						</v-btn>
					</template>
					<span>{{ Lang('editor.toolbar.super') }}</span>
				</v-tooltip>
			</v-btn-toggle>
			<v-divider vertical></v-divider>
			<v-tooltip bottom>
				<template v-slot:activator="{ on }">
					<v-btn icon tile v-on="on" @click="addLink">
						<v-icon>mdi-link-variant-plus</v-icon>
					</v-btn>
				</template>
				<span>{{ Lang('editor.toolbar.link') }}</span>
			</v-tooltip>
			<v-tooltip bottom>
				<template v-slot:activator="{ on }">
					<v-btn icon tile v-on="on" @click="delLink">
						<v-icon>mdi-link-variant-minus</v-icon>
					</v-btn>
				</template>
				<span>{{ Lang('editor.toolbar.unlink') }}</span>
			</v-tooltip>
			<!-- E:Text Format -->
		</v-toolbar>
		<v-toolbar id="toolbar-text" class="custom-toolbar d-md-none" v-if="toggle.textBar" dense>
			<v-divider vertical></v-divider>
			<!-- S:Text Color -->
			<v-menu 
				:close-on-content-click="false"
				offset-y
				transition="slide-y-transition"
				color="white"
				v-model="toggle.tColorView2"
				fixed
				bottom>
				<template v-slot:activator="{ on: menu }">
					<v-tooltip bottom>
						<template v-slot:activator="{ on: tooltip }">
							<v-btn icon tile v-on="{ ...tooltip, ...menu }">
								<v-icon>mdi-format-color-text</v-icon>
							</v-btn>
						</template>
						<span>{{ Lang('editor.toolbar.text-color') }}</span>
					</v-tooltip>
				</template>
				<v-color-picker 
					:hide-mode-switch="true"
					v-model="toggle.tColor"
					class="custom-picker"
					mode="hexa"
					show-swatches></v-color-picker>
				<v-card tile color="white" align="right">
					<v-btn text color="grey darken-1" @click="toggle.tColorView2=false; textFrontColorChange();" tile>{{ Lang('apply') }}</v-btn>
				</v-card>
			</v-menu>
			<v-menu 
				:close-on-content-click="false"
				offset-y
				transition="slide-y-transition"
				color="white"
				v-model="toggle.bColorView2"
				fixed
				bottom>
				<v-color-picker 
					:hide-mode-switch="true"
					v-model="toggle.bColor"
					class="custom-picker"
					mode="hexa"
					show-swatches></v-color-picker>
				<template v-slot:activator="{ on: menu }">
					<v-tooltip bottom>
						<template v-slot:activator="{ on: tooltip }">
							<v-btn icon tile v-on="{ ...tooltip, ...menu }">
								<v-icon>mdi-format-color-fill</v-icon>
							</v-btn>
						</template>
						<span>{{ Lang('editor.toolbar.bg-color') }}</span>
					</v-tooltip>
				</template>
				<v-card tile color="white" align="right">
					<v-btn text color="grey darken-1" @click="toggle.bColorView2=false; textBackColorChange();" tile>{{ Lang('apply') }}</v-btn>
				</v-card>
			</v-menu>
			<!-- S:Text Color -->
			<!-- S:Text Etc -->
			<div class="d-flex pa-0">
				<v-divider vertical></v-divider>
				<v-overflow-btn
					depressed
					label="Code"
					style="max-width:110px"
					hide-details
					class="pa-0"
					overflow
					@change="codeBlock"
					></v-overflow-btn>
				<v-overflow-btn
					depressed
					label="Tag"
					style="max-width:100px"
					hide-details
					class="pa-0"
					overflow
					:items="tag.list"
					v-model="tag.cur"
					@change="tagChange"
					></v-overflow-btn>
				<v-overflow-btn
					depressed
					label="Font"
					style="max-width:150px"
					hide-details
					class="pa-0"
					overflow
					:items="font.list"
					v-model="font.cur"
					@change="fontChange"
					></v-overflow-btn>
				<v-overflow-btn
					depressed
					label="Size"
					style="max-width:130px"
					hide-details
					class="pa-0"
					overflow
					:items="size.list"
					v-model="size.cur"
					@change="sizeChange"
					></v-overflow-btn>
			</div>
			<!-- E:Text Etc -->
			<!-- S:Text Format -->
			<v-divider vertical></v-divider>
			<v-btn-toggle 
				v-model="toggle.format"
				class="d-flex d-md-none pa-0 custom"
				dense
				group
				multiple
				madatory>
				<v-tooltip bottom>
					<template v-slot:activator="{ on }">
						<v-btn icon tile v-on="on" class="pa-0 mx-0" @click="toggleBold(); return false">
							<v-icon>mdi-format-bold</v-icon>
						</v-btn>
					</template>
					<span>{{ Lang('editor.toolbar.bold') }}</span>
				</v-tooltip>
				<v-tooltip bottom>
					<template v-slot:activator="{ on }">
						<v-btn icon tile v-on="on" class="pa-0 mx-0" @click="toggleItalic">
							<v-icon>mdi-format-italic</v-icon>
						</v-btn>
					</template>
					<span>{{ Lang('editor.toolbar.italic') }}</span>
				</v-tooltip>
				<v-tooltip bottom>
					<template v-slot:activator="{ on }">
						<v-btn icon tile v-on="on" class="pa-0 mx-0" @click="toggleUnderline">
							<v-icon>mdi-format-underline</v-icon>
						</v-btn>
					</template>
					<span>{{ Lang('editor.toolbar.underline') }}</span>
				</v-tooltip>
				<v-tooltip bottom>
					<template v-slot:activator="{ on }">
						<v-btn icon tile v-on="on" class="pa-0 mx-0" @click="toggleStrike">
							<v-icon>mdi-format-strikethrough-variant</v-icon>
						</v-btn>
					</template>
					<span>{{ Lang('editor.toolbar.strike') }}</span>
				</v-tooltip>
			</v-btn-toggle>
			<v-btn-toggle 
				v-model="toggle.super_sub"
				class="d-flex d-md-none pa-0 custom"
				dense
				group
				madatory>
				<v-divider vertical></v-divider>
				<v-tooltip bottom>
					<template v-slot:activator="{ on }">
						<v-btn icon tile v-on="on" class="pa-0 mx-0" @click="toggleSub">
							<v-icon>mdi-format-subscript</v-icon>
						</v-btn>
					</template>
					<span>{{ Lang('editor.toolbar.sub') }}</span>
				</v-tooltip>
				<v-tooltip bottom>
					<template v-slot:activator="{ on }">
						<v-btn icon tile v-on="on" class="pa-0 mx-0" @click="toggleSuper">
							<v-icon>mdi-format-superscript</v-icon>
						</v-btn>
					</template>
					<span>{{ Lang('editor.toolbar.super') }}</span>
				</v-tooltip>
			</v-btn-toggle>
			<v-divider vertical></v-divider>
			<v-tooltip bottom>
				<template v-slot:activator="{ on }">
					<v-btn icon tile v-on="on" @click="addLink">
						<v-icon>mdi-link-variant-plus</v-icon>
					</v-btn>
				</template>
				<span>{{ Lang('editor.toolbar.link') }}</span>
			</v-tooltip>
			<v-tooltip bottom>
				<template v-slot:activator="{ on }">
					<v-btn icon tile v-on="on" @click="delLink">
						<v-icon>mdi-link-variant-minus</v-icon>
					</v-btn>
				</template>
				<span>{{ Lang('editor.toolbar.unlink') }}</span>
			</v-tooltip>
			<!-- E:Text Format -->
		</v-toolbar>
	</div>
	<!-- E:New Editor Toolbar -->
</template>
<style>
.gs-custom
	.v-overflow-btn
	.v-select__selections {
	width: auto !important;
}

.gs-custom
	.v-toolbar__content {
	padding: 0 !important;
}
</style>
<script lang="ts">
import Vue from 'vue';
import Lang from './languages/Lang.js';
import ICC from './icc';

const EmitICC = (method: string, ...args: any[]) => {
	ICC['editor-icc'].emit
		.apply(ICC['editor-icc'], [method].concat(args));
};


export default Vue.extend({
	name: 'Toolbar',

	methods: {
		Lang,

		/* S:Work Flow */
		erase() {
			// tslint:disable-next-line
			console.log("clicked erase");
			EmitICC('erase');
		},
		undo() {
			// tslint:disable-next-line
			console.log("clicked undo");
			EmitICC('undo');
		},
		redo() {
			// tslint:disable-next-line
			console.log("clicked redo");
			EmitICC('redo');
		},
		/* E:Work Flow */

		/* S:Text Align */
		changeAlign(align: string) {
			// tslint:disable-next-line
			console.log("clicked change-align", align);
			EmitICC('change-align', align);
		},
		/* E:Text Align */


		textBarToggle() {
			// tslint:disable-next-line
			console.log("clicked textbar-toggle");
			this.toggle.textBar = !this.toggle.textBar;
		},

		/* S:Text Color */
		textFrontColorChange() {
			// tslint:disable-next-line
			console.log("clicked text-front-color-change");
			const color = this.toggle.tColor;
			EmitICC('text-front-color-change', color);
		},
		textBackColorChange() {
			// tslint:disable-next-line
			console.log("clicked text-back-color-change");
			const color = this.toggle.bColor;
			EmitICC('text-back-color-change', color);
		},
		/* E:Text Color */

		/* S:Utility */
		insertPicture() {
			// tslint:disable-next-line
			console.log("clicked insert-picture");
			EmitICC('insert-picture');
		},
		insertTable() {
			// tslint:disable-next-line
			console.log("clicked insert-table");
			EmitICC('insert-table');
		},
		viewHTML() {
			// tslint:disable-next-line
			console.log("clicked view-html");
			EmitICC('view-html');
		},
		viewMarkDown() {
			// tslint:disable-next-line
			console.log("clicked view-markdown");
			EmitICC('view-markdown');
		},
		/* E:Utility */

		/* S:Text Etc */
		codeBlock() {
			// tslint:disable-next-line
			console.log("change code-block");
			const code = this.code.cur;
			EmitICC('code-block', code);
		},
		tagChange() {
			// tslint:disable-next-line
			console.log("change tag-change");
			const tag = this.tag.cur;
			EmitICC('tag-change', tag);
		},
		fontChange(selected: string) {
			// tslint:disable-next-line
			console.log("change font-change");
			this.font.cur = selected;
			console.log(this.font.cur);
			EmitICC('font-change', selected);
		},
		sizeChange() {
			// tslint:disable-next-line
			console.log("change size-change");
			const size = this.size.cur;
			EmitICC('size-change', size);
		},
		/* E:Text Etc */

		/* S:Text Format */
		toggleBold() {
			// tslint:disable-next-line
			console.log("clicked toggle-bold");
			this.toggle.bold = !this.toggle.bold;
			EmitICC('toggle-bold', this.toggle.bold);
		},
		toggleItalic() {
			// tslint:disable-next-line
			console.log("clicked toggle-italic");
			this.toggle.italic = !this.toggle.italic;
			EmitICC('toggle-italic', this.toggle.italic);
		},
		toggleUnderline() {
			// tslint:disable-next-line
			console.log("clicked toggle-underline");
			this.toggle.underline = !this.toggle.underline;
			EmitICC('toggle-underline', this.toggle.underline);
		},
		toggleStrike() {
			// tslint:disable-next-line
			console.log("clicked toggle-strike");
			this.toggle.strike = !this.toggle.strike;
			EmitICC('toggle-strike', this.toggle.strike);
		},
		toggleSub() {
			// tslint:disable-next-line
			console.log("clicked toggle-sub");
			this.toggle.super = false;
			this.toggle.sub = !this.toggle.sub;
			EmitICC('toggle-sub-super', this.toggle.sub, this.toggle.super);
		},
		toggleSuper() {
			// tslint:disable-next-line
			console.log("clicked toggleSuper");
			this.toggle.super = !this.toggle.super;
			this.toggle.sub = false;
			EmitICC('toggle-sub-super', this.toggle.sub, this.toggle.super);
		},
		addLink() {
			// tslint:disable-next-line
			console.log("clicked add-link");
			EmitICC('add-link');
		},
		delLink() {
			// tslint:disable-next-line
			console.log("clicked delLink");
			EmitICC('del-link');
		},
		/* E:Text Format */

	},

	components: {
	},

	mounted() {
		ICC['editor-icc'].emit('editor-icc', 'Hello', 'World');

		const EICC = ICC['editor-icc'];
		EICC.on('cursor-bold', (active: boolean) => {
			this.toggle.bold = active;
		});
		EICC.on('cursor-italic', (active: boolean) => {
			this.toggle.italic = active;
		});
		EICC.on('cursor-strike', (active: boolean) => {
			this.toggle.strike = active;
		});
		EICC.on('cursor-underline', (active: boolean) => {
			this.toggle.underline = active;
		});
	},

	data: () => ({
		ignore: {},

		align: ['left', 'center', 'right', 'justify'],

		code: {
			cur: '',
			list: ['bash', 'c', 'js', 'html'],
		},
		tag: {
			cur: '',
			list: ['h1', 'h2', 'h3', 'h4'],
		},
		font: {
			cur: '',
			list: ['aaa', 'bbb', 'ccc', 'ddd'],
		},
		size: {
			cur: '',
			list: ['14', '15', '16', '17'],
		},

		toggle: {
			bold: false,
			italic: false,
			underline: false,
			strike: false,
			sub: false,
			super: false,
			textBar: false,
			align: 0,
			format: [],
			super_sub: [],
			tColor: '#000000',
			tColorView0: false,
			tColorView1: false,
			tColorView2: false,
			bColor: '#000000',
			bColorView0: false,
			bColorView1: false,
			bColorView2: false,
		},
	}),
});
</script>
